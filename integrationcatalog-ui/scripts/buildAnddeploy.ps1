

param (
    [Parameter(Position=0, Mandatory=$true)]
    [ValidateSet("start", "stop")]
    [string]$action
)
# Relative paths to your project folders
$folder1 = "..\src\"
$folder2 = "..\backend\"

# Path to store the PID files
$pidPath = "C:\"

# Function to start servers
function Start-Servers {
    Write-Output "Starting npm servers..."

    # Start the npm server in the first folder
    $pidFile1 = Join-Path -Path $pidPath -ChildPath "first-folder-npm.pid"
    $job1 = Start-Job -ScriptBlock {
        param ($folder)
        Set-Location $folder
        npm install
        npm run dev
    } -ArgumentList (Resolve-Path $folder1)
    $job1.Id | Out-File -FilePath $pidFile1 -Force
    Write-Output "Started server in $folder1 with Job ID $($job1.Id)"
    # Start the npm server in the second folder
    $pidFile2 = Join-Path -Path $pidPath -ChildPath "second-folder-npm.pid"
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

# Function to stop servers
function Stop-Servers {
    Write-Output "Stopping npm servers..."

    # Stop the server in the first folder
    $pidFile1 = Join-Path -Path $pidPath -ChildPath "first-folder-npm.pid"
    if (Test-Path $pidFile1) {
        $jobId1 = Get-Content $pidFile1 | ForEach-Object { [int]$_ }
        $job1 = Get-Job -Id $jobId1
        if ($job1) {
            $job1 | Stop-Job
            Remove-Job -Job $job1
            Write-Output "Stopped server in $folder1"
        }
        Remove-Item $pidFile1 -Force
    }

    # Stop the server in the second folder
    $pidFile2 = Join-Path -Path $pidPath -ChildPath "second-folder-npm.pid"
    if (Test-Path $pidFile2) {
        $jobId2 = Get-Content $pidFile2 | ForEach-Object { [int]$_ }
        $job2 = Get-Job -Id $jobId2
        if ($job2) {
            $job2 | Stop-Job
            Remove-Job -Job $job2
            Write-Output "Stopped server in $folder2"
        }
        Remove-Item $pidFile2 -Force
    }

    Write-Output "Servers stopped."
}


switch ($action) {
    "start" { Start-Servers }
    "stop" { Stop-Servers }
    default { Write-Output "Usage: .\buildAnddeploy.ps1 {start|stop}" }
}
