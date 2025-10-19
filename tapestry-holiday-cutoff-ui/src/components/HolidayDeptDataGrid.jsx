import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import DataGridToolBar from "./DataGridToolBar";

export default function HolidayDeptDataGrid() {
  const [rowModel, setRowModel] = useState({});
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const { httpClient } = useAxios();

  const fetchHolidayDeptData = useCallback(async () => {
    let url = "/holidaydept/items";
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

  const columns = [
    {
      field: "brand",
      headerName: "Brand",
      width: 440,
    },
    {
      field: "dept",
      headerName: "Dept",
      width: 440,
    },
    {
      field: "deptDesc",
      headerName: "Department Description",
      width: 240,
    },
    {
      field: "include",
      headerName: "Include",
      type: "boolean",
      valueGetter: (value) => value === "Yes",
      width: 240,
    },
  ];

  useEffect(() => {
    fetchHolidayDeptData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
