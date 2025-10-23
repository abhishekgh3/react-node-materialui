

param (
    [Parameter(Position=0, Mandatory=$true)]
    [ValidateSet("start", "stop", "restart")]
    [string]$action
)
# Relative paths to your project folders
$folder1 = "..\src\"
$folder2 = "..\backend\"

# Path to store the PID files
$pidPath = Join-Path -Path $env:USERPROFILE -ChildPath "Documents"

function Test-ServerRunning {
    param (
        [string]$pidFile
    )

    if (Test-Path $pidFile) {
        $storedPid = Get-Content $pidFile
        try {
            Get-Process -Id $storedPid -ErrorAction Stop
            Write-Output "Process with PID $storedPid is running."
            return $true
        } catch {
            Write-Output "Process with PID $storedPid is not running."
        }
    }
    return $false
}

# Function to start servers
function Start-Servers {
    Write-Output "Starting npm servers..."

    # Start the npm server in the first folder
    $pidFile1 = Join-Path -Path $pidPath -ChildPath "frontend-npm.pid"
     if (Test-ServerRunning $pidFile1) {
        Write-Output "Server in $folder1 is already running with Job ID $(Get-Content $pidFile1)"
     } else {
        $job1 = Start-Job -ScriptBlock {
            param ($folder)
            Set-Location $folder
            npm install
            npm run dev
        } -ArgumentList (Resolve-Path $folder1)
        $job1.Id | Out-File -FilePath $pidFile1 -Force
        Write-Output "Started server in $folder1 with Job ID $($job1.Id)"
     }
    
    # Start the npm server in the second folder
    $pidFile2 = Join-Path -Path $pidPath -ChildPath "backend-npm.pid"

    if (Test-ServerRunning $pidFile2) {
         Write-Output "Server in $folder2 is already running with Job ID $(Get-Content $pidFile2)"
    } else {
        $job2 = Start-Job -ScriptBlock {
            param ($folder)
            Set-Location $folder
            npm install
            npm start
        } -ArgumentList (Resolve-Path $folder2)
        $job2.Id | Out-File -FilePath $pidFile2 -Force
        Write-Output "Started server in $folder2 with Job ID $($job2.Id)"
        Write-Output "Servers started."
    }
    
}

# Function to stop servers
function Stop-Servers {
    Write-Output "Stopping npm servers..."

    # Stop the server in the first folder
    $pidFile1 = Join-Path -Path $pidPath -ChildPath "frontend-npm.pid"
    if (Test-Path $pidFile1) {
        $jobId1 = Get-Content $pidFile1 | ForEach-Object { [int]$_ }
        $job1 = Get-Job -Id $jobId1
        if ($job1) {
            $job1 | Stop-Job
            Remove-Job -Job $job1
            Write-Output "Stopped server in $folder1"
        }
        Remove-Item $pidFile1 -Force
    } else {
        Write-Output "No PID file found for the server in $folder1"
   }

    # Stop the server in the second folder
    $pidFile2 = Join-Path -Path $pidPath -ChildPath "backend-npm.pid"
    if (Test-Path $pidFile2) {
        $jobId2 = Get-Content $pidFile2 | ForEach-Object { [int]$_ }
        $job2 = Get-Job -Id $jobId2
        if ($job2) {
            $job2 | Stop-Job
            Remove-Job -Job $job2
            Write-Output "Stopped server in $folder2"
        }
        Remove-Item $pidFile2 -Force
    } else {
         Write-Output "No PID file found for the server in $folder2"
    }

    Write-Output "Servers stopped."
}
function Restart-Servers {
    Stop-Servers
    Start-Servers
}

switch ($action) {
    "start" { Start-Servers }
    "stop" { Stop-Servers }
    "restart" {Restart-Servers}
    default { Write-Output "Usage: .\buildAnddeploy.ps1 {start|stop}" }
}
