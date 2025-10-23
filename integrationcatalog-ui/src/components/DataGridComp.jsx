import { CircularProgress, Grid } from "@mui/material";
import { DataGrid, getGridStringOperators } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { alertActions } from "../store/alert";
import { catalogueActions } from "../store/catalogue";
import { dialogActions } from "../store/dialog";
import CustomFilterPanel from "./CustomFilterPanel";
import CustomToolbar from "./CustomToolBar";

export default function DataGridComp() {
  const [isRowSelected, setRowSelected] = useState(false);
  const [items, setItems] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPanelItems, setFilterPanelItems] = useState({});
  const { httpClient } = useAxios();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const filterQueryString = useSelector(
    (state) => state.catalogue.filterQueryString
  );
  const reloadItems = useSelector((state) => state.catalogue.reloadItems);

  const dispatch = useDispatch();

  const filterStringOperator = getGridStringOperators().filter(
    (operator) => operator.value === "equals"
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "level",
      headerName: "Level",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      editable: true,
      filterOperators: filterStringOperator,
    },
    {
      field: "source",
      headerName: "Source",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "target",
      headerName: "Target",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      filterable: false,
      filterOperators: filterStringOperator,
      width: 110,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "regionNA",
      headerName: "RegionNA",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "regionEU",
      headerName: "Region EU",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "regionAsia",
      headerName: "Region Asia",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "regionJP",
      headerName: "Region JP",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "channel",
      headerName: "Channel",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "directIntegration",
      headerName: "Direct Integration",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "usingCP4i",
      headerName: "Using CP4i",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "context",
      headerName: "Context",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
    {
      field: "interface",
      headerName: "Interface",
      width: 110,
      editable: true,
      filterable: false,
      filterOperators: filterStringOperator,
    },
  ];

  const columnGroupingModel = [
    {
      groupId: "identifiers",
      headerName: "Identifiers",
      headerClassName: "my-super-theme--naming-group",
      children: [
        { field: "id" },
        { field: "level" },
        { field: "source" },
        { field: "target" },
        { field: "brand" },
        { field: "status" },
      ],
    },
    {
      groupId: "regionChannel",
      headerName: "Region And Channel",
      headerClassName: "my-super-theme--naming-group",
      children: [
        { field: "regionNA" },
        { field: "regionEU" },
        { field: "regionAsia" },
        { field: "regionJP" },
        { field: "channel" },
      ],
    },
    {
      groupId: "integrationType",
      headerName: "Integration Type",
      headerClassName: "my-super-theme--naming-group",
      children: [{ field: "directIntegration" }, { field: "usingCP4i" }],
    },
    {
      groupId: "contextInterface",
      headerName: "Context And Interface",
      headerClassName: "my-super-theme--naming-group",
      children: [{ field: "context" }, { field: "interface" }],
    },
  ];

  const onFilterChange = useCallback(
    (filterModel) => {
      if (filterModel.items && filterModel.items[0].value) {
        setFilterPanelItems(() => ({
          filterPanelItem: [filterModel.items[0].field],
          operator: filterModel.items[0].operator,
          value: filterModel.items[0].value,
        }));
      }
      if (filterModel.items && filterModel.items[0].value === "") {
        setFilterPanelItems(() => {
          return {};
        });
        dispatch(catalogueActions.addFilterQueryString(""));
      }
    },
    [dispatch]
  );

  const handleApplyFilter = (current) => {
    let params = [];
    for (const [key, value] of Object.entries(filterPanelItems)) {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    dispatch(catalogueActions.addFilterQueryString(params.join("&")));
    current.hideFilterPanel();
  };
  const fetchCatalogueItems = useCallback(async () => {
    try {
      let url = filterQueryString
        ? `catalogue/items?${filterQueryString}`
        : "catalogue/items";
      setIsLoading(true);
      const response = await httpClient.get(url, {
        params: {
          pageNumber: paginationModel.page,
          pageSize: paginationModel.pageSize,
        },
      });
      setItems(response.data.items);
      setRowCount(response.data.totalItems);
    } catch (error) {}
    setIsLoading(false);
  }, [filterQueryString, paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    fetchCatalogueItems();
  }, [fetchCatalogueItems]);

  const handleRowSelection = (ids) => {
    if (ids && ids.length > 0) {
      const selectedIDs = new Set(ids);
      const selectedRow = items.find((item) => selectedIDs.has(item.id));
      dispatch(dialogActions.createEditCatalogueItem(selectedRow));
      dispatch(dialogActions.addDeleteId(selectedRow.id));
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  };

  const handleRowUpdate = async (updatedRow) => {
    const { id, ...reqBody } = updatedRow;
    await httpClient.put(`catalogue/item/${id}`, reqBody, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(alertActions.openAlertWithAMessage(`Item Saved `));
    dispatch(catalogueActions.setReloadCatalogueItems(true));
  };

  const handleProcessRowUpdateError = (event) => {
    dispatch(alertActions.openErrorAlterWithMessage("Error in updation !!"));
  };
  useEffect(() => {
    if (reloadItems) {
      fetchCatalogueItems();
      dispatch(catalogueActions.setReloadCatalogueItems(false));
    }
  }, [dispatch, fetchCatalogueItems, reloadItems]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: 10,
      }}
    >
      <Grid
        item
        sx={{
          width: "95%",
          "& .my-super-theme--naming-group": {
            fontSize: "17px",
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          rows={items}
          columns={columns}
          columnGroupingModel={columnGroupingModel}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
                page: 0,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={rowCount}
          paginationMode="server"
          filterMode="server"
          onFilterModelChange={onFilterChange}
          onRowSelectionModelChange={(ids) => {
            handleRowSelection(ids);
          }}
          processRowUpdate={(updatedRow, originalRow) =>
            handleRowUpdate(updatedRow)
          }
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: CircularProgress,
            filterPanel: CustomFilterPanel,
          }}
          slotProps={{
            toolbar: { isRowSelected: isRowSelected },
            filterPanel: {
              handleApplyFilter: handleApplyFilter,
              isButtonEnabled: Object.keys(filterPanelItems).length > 0,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
