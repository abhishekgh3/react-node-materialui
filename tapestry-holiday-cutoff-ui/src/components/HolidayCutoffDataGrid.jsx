import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import {
  DataGrid,
  getGridSingleSelectOperators,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { alertActions } from "../store/alert";
import { dialogActions } from "../store/dialog";
import DataGridToolBar from "./DataGridToolBar";

dayjs.extend(utc);

export default function HolidayCutoffDataGrid() {
  const dispatch = useDispatch();
  const deleteSuccess = useSelector((state) => state.dialog.sucess);

  const [rowModel, setRowModel] = useState({});
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [selectMenuItems, setSelectMenuItems] = useState({});
  const [deleteId, setDeleteId] = useState(0);
  const { httpClient } = useAxios();
  const [isAddAllowed, setIsAddAllowed] = useState(true);
  const [filterPanelItems, setFilterPanelItems] = useState(null);

  const filterSelectOperator = getGridSingleSelectOperators().filter(
    (operator) => operator.value === "is"
  );

  const addNewRow = useCallback(
    function addNewRow() {
      setRows((oldRows) => [
        {
          id: rowCount + 1,
          config: "",
          brand: "",
          country: "",
          enterprise: "",
          channel: "",
          shipping: "",
          compare: "",
          isNew: true,
        },
        ...oldRows,
      ]);
      setRowModel((oldModel) => ({
        ...oldModel,
        [rowCount + 1]: { mode: GridRowModes.Edit },
      }));
      setIsAddAllowed(false);
    },
    [rowCount]
  );

  const getValueOptions = (optionName) => {
    let valueOptions = [];
    if (
      selectMenuItems[optionName] !== null &&
      selectMenuItems[optionName] !== undefined
    ) {
      valueOptions = selectMenuItems[optionName].map((item) => ({
        label: item.value === null ? item.code : item.value,
        value: item.code,
      }));
    }
    valueOptions = [{ label: "N/A", value: "none" }, ...valueOptions];
    return valueOptions;
  };

  const fetchHolidayCutOffItems = useCallback(async () => {
    let url = "/holidaycutoff/items";
    setIsLoading(true);
    let params = {
      pageNumber: paginationModel.page,
      pageSize: paginationModel.pageSize,
    };
    if (filterPanelItems) {
      params = { ...filterPanelItems, ...params };
    }
    const response = await httpClient.get(url, {
      params,
    });
    setRows(response.data.items);
    setRowCount(response.data.totalItems);
    setSelectMenuItems(response.data.selectMenuItems);
    setIsLoading(false);
  }, [
    filterPanelItems,
    httpClient,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  const handleEditClick = (id) => {
    setRowModel({ ...rowModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = async (id) => {
    setDeleteId(id);
    dispatch(
      dialogActions.showConfirmation({
        message: "Are you sure you want to delete the item?",
        url: `/holidaycutoff/item/${id}`,
        type: "Delete",
      })
    );
  };

  const handleSaveClick = async (id) => {
    setRowModel({ ...rowModel, [id]: { mode: GridRowModes.View } });
    setIsAddAllowed(true);
  };
  const handleCancelClick = (id) => {
    setRowModel({
      ...rowModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
      setIsAddAllowed(true);
    }
  };

  const handleRowModesModelChange = useCallback((newRowModesModel) => {
    setRowModel(newRowModesModel);
  }, []);

  const handleRowEditStop = useCallback((params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  }, []);

  const processRowUpdate = async (newRow) => {
    let response;
    let updatedRow = newRow;
    // eslint-disable-next-line no-unused-vars
    const { id, isNew, ...payload } = newRow;
    payload.active = payload.active ? "Yes" : "No";
    let url = "/holidaycutoff/item";
    setIsLoading(true);
    console.log(newRow);
    if (newRow.isNew) {
      response = await httpClient.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      updatedRow = response.data;
      updatedRow.isNew = false;
      setRows((oldRows) => {
        oldRows = oldRows.filter((oldRow) => oldRow.id !== newRow.id);
        return [updatedRow, ...oldRows];
      });
    } else {
      url += `/${newRow.id}`;
      response = await httpClient.put(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      updatedRow = response.data;

      setRows((rows) =>
        rows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
    }
    if (newRow.isNew) {
      dispatch(alertActions.openAlertWithAMessage(`Item Created`));
    } else {
      dispatch(alertActions.openAlertWithAMessage(`Item Updated`));
    }
    setIsLoading(false);

    return updatedRow;
  };

  const handleProcessRowUpdateError = () => {
    dispatch(alertActions.openErrorAlterWithMessage("Error in updation !!"));
  };

  const handleFilterChange = useCallback(
    (filterModel) => {
      console.log(filterModel.items[0]);
      if (filterModel.items && filterModel.items[0].value) {
        setFilterPanelItems({
          filterKey: filterModel.items[0].field,
          filterValue: filterModel.items[0].value,
        });
      } else if (
        filterModel.items &&
        !filterModel.items[0].value &&
        filterPanelItems != null
      ) {
        setFilterPanelItems(null);
      }
    },
    [filterPanelItems]
  );

  useEffect(() => {
    fetchHolidayCutOffItems();
  }, [fetchHolidayCutOffItems]);

  useEffect(() => {
    if (deleteSuccess) {
      setRows((oldRows) => oldRows.filter((row) => row.id !== deleteId));
      setRowModel((oldRowModel) => {
        delete oldRowModel.deleteId;
        return oldRowModel;
      });
      setRowCount((oldRowCount) => oldRowCount - 1);
      dispatch(dialogActions.resetStatus());
      dispatch(alertActions.openAlertWithAMessage(`Item Deleted`));
    }
  }, [deleteId, deleteSuccess, dispatch]);

  const columns = [
    {
      field: "config",
      headerName: "Config",
      width: 60,
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["config"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Config"),
      editable: true,
      filterable: false,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 60,
      align: "left",
      type: "number",
      editable: true,
      filterable: false,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 70,
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["brand"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Brand"),
      editable: true,
      filterable: true,
      filterOperators: filterSelectOperator,
    },
    {
      field: "country",
      headerName: "Country",
      width: 60,
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["country"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Country"),
      editable: true,
      filterable: true,
      filterOperators: filterSelectOperator,
    },
    {
      field: "enterprise",
      headerName: "Enterprise",
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["enterprise"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Enterprise"),
      editable: true,
      filterable: false,
    },
    {
      field: "channel",
      headerName: "Channel",
      width: 100,
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["channel"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Channel"),
      editable: true,
      filterable: true,
      filterOperators: filterSelectOperator,
    },
    {
      field: "shipping",
      headerName: "Shipping",
      width: 120,
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["shipping"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Ship"),
      editable: true,
      filterable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "dateTime",
      width: 200,
      valueGetter: (value) => value && new Date(value),
      valueParser: (value) =>
        value && dayjs(value).format("YYYY-MM-DD hh:mm:ss A"),
      valueFormatter: (value) =>
        value && dayjs(value).format("ddd, MM-DD-YYYY hh:mm A"),
      editable: true,
      filterable: false,
    },
    {
      field: "cutOffDate",
      headerName: "Cut Off Date(EST)",
      type: "dateTime",
      width: 200,
      valueGetter: (value) => value && new Date(value),
      valueParser: (value) =>
        value && dayjs(value).format("YYYY-MM-DD hh:mm:ss A"),
      valueFormatter: (value) =>
        value && dayjs(value).format("ddd, MM-DD-YYYY hh:mm A"),
      editable: true,
      filterable: false,
    },
    {
      field: "cutOffDateUTC",
      headerName: "Cut Off Date(UTC)",
      type: "dateTime",
      width: 200,
      editable: true,
      filterable: false,
      valueParser: (value) =>
        value && dayjs(value).utc().format("YYYY-MM-DDTHH:mm:ssZ"),
      valueGetter: (value) => value && new Date(value),
      valueFormatter: (value) =>
        value && dayjs(value).utc().format("YYYY-MM-DDTHH:mm:ssZ"),
    },
    {
      field: "promiseDate",
      headerName: "Promise Date(UTC)",
      type: "date",
      width: 140,
      editable: true,
      filterable: false,
      valueGetter: (value) => value && new Date(value),
      valueParser: (value) => value && dayjs(value).format("YYYY-MM-DD"),
      valueFormatter: (value) =>
        value && dayjs(value).format("ddd, MM-DD-YYYY"),
    },
    {
      field: "compare",
      headerName: "Compare",
      type: "singleSelect",
      valueGetter: (value) => (value === null || value === "" ? "none" : value),
      valueSetter: (value, row) => {
        row["compare"] = value === "none" ? null : value;
        return row;
      },
      valueOptions: getValueOptions("Compare"),
      editable: true,
      filterable: false,
    },
    {
      field: "active",
      headerName: "Active",
      width: 60,
      editable: true,
      filterable: false,
      valueGetter: (value) => value === "Yes",
      type: "boolean",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              key={id}
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              key={id}
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<Edit />}
            onClick={() => handleEditClick(id)}
            label="Edit"
            key={1}
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            key={2}
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      sx={{ width: "95%" }}
      editMode="row"
      loading={isLoading}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      paginationMode="server"
      columns={columns}
      rowCount={rowCount}
      rowModesModel={rowModel}
      rows={rows}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
            page: 0,
          },
        },
      }}
      paginationModel={paginationModel}
      pageSizeOptions={[10, 15, 20, 25]}
      filterMode="server"
      onFilterModelChange={handleFilterChange}
      onRowModesModelChange={handleRowModesModelChange}
      onPaginationModelChange={setPaginationModel}
      onRowEditStop={handleRowEditStop}
      slots={{
        toolbar: DataGridToolBar,
        loadingOverlay: CircularProgress,
      }}
      slotProps={{
        toolbar: {
          addNewRow,
          isAddAllowed,
        },
      }}
    ></DataGrid>
  );
}
