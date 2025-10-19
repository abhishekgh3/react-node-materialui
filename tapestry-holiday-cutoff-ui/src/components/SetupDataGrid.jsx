import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios.js";
import DataGridToolBar from "./DataGridToolBar";

export default function SetupDataGrid() {
  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "typeRef", headerName: "Code Ref", flex: 1 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "value", headerName: "Value", flex: 1 },
  ];

  const [rowModel, setRowModel] = useState({});
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const { httpClient } = useAxios();

  const fetchSetupData = useCallback(async () => {
    let url = "/setup/items";
    setIsLoading(true);
    const response = await httpClient.get(url, {
      params: {
        pageNumber: paginationModel.page,
        pageSize: paginationModel.pageSize,
      },
    });
    setRows(response.data.items);
    setRowCount(response.data.totalItems);
    setIsLoading(false);
  }, [httpClient, paginationModel.page, paginationModel.pageSize]);

  const handleRowModesModelChange = useCallback((newRowModesModel) => {
    setRowModel(newRowModesModel);
  }, []);

  useEffect(() => {
    fetchSetupData();
  }, [fetchSetupData]);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      sx={{ width: "95%" }}
      loading={isLoading}
      paginationMode="server"
      rowCount={rowCount}
      rowModesModel={rowModel}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
            page: 0,
          },
        },
      }}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      onRowModesModelChange={handleRowModesModelChange}
      pageSizeOptions={[10, 15, 20, 25]}
      slots={{
        toolbar: DataGridToolBar,
        loadingOverlay: CircularProgress,
      }}
    ></DataGrid>
  );
}
