import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catalogueActions } from "../store/catalogue";
import { dialogActions } from "../store/dialog";
import ContextAndInterfaceContent from "./ItemGroup/ContextAndInterfaceContent";
import IdentifierContent from "./ItemGroup/IdentifierContent";
import ImpactContent from "./ItemGroup/ImpactContent";
import IntegrationTypeContent from "./ItemGroup/IntegrationTypeContent";
import RegionContent from "./ItemGroup/RegionContent";
import { alertActions } from "../store/alert";

import useAxios from "../hooks/useAxios";

export default function DialogComp() {
  const showDialog = useSelector((state) => state.dialog.showDialog);
  const title = useSelector((state) => state.dialog.title);
  const { httpClient } = useAxios();
  const editCatalogueItem = useSelector(
    (state) => state.dialog.editCatalogueItem
  );
  const isEdit = useSelector((state) => state.dialog.isEdit);
  const dispatch = useDispatch();
  const newCatalogueItem = useSelector(
    (state) => state.dialog.newCatalogueItem
  );
  const [items, setItems] = useState();

  const handleClose = () => {
    dispatch(dialogActions.hideDialog());
  };

  const handleSaveChanges = async () => {
    try {
      if (isEdit) {
        const { id, ...reqBody } = editCatalogueItem;
        await httpClient.put(`catalogue/item/${id}`, reqBody, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await httpClient.post("catalogue/item", newCatalogueItem, {
          headers: { "Content-Type": "application/json" },
        });
      }
      dispatch(dialogActions.hideDialog());
      dispatch(
        alertActions.openAlertWithAMessage(
          `Item ${isEdit ? "Saved" : "Created"} `
        )
      );
      dispatch(catalogueActions.setReloadCatalogueItems(true));
    } catch (error) {}
  };

  useEffect(() => {
    async function catalogueMenuItems() {
      try {
        const response = await httpClient.get("catalogue/menu/items");
        setItems(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    }
    catalogueMenuItems();
  }, []);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      aria-labelledby="customized-dialog-title"
      open={showDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="identifiers"
          >
            <Typography variant="h6">Identifiers</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <IdentifierContent
              selectedCatalogueItem={
                isEdit ? editCatalogueItem : newCatalogueItem
              }
              items={items}
            ></IdentifierContent>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="regionAndChannel"
          >
            <Typography variant="h6">Region And Channel</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RegionContent items={items}></RegionContent>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel4-content"
            id="impact"
          >
            <Typography variant="h6">Impact</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ImpactContent></ImpactContent>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel4-content"
            id="impact"
          >
            <Typography variant="h6">Integration Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <IntegrationTypeContent></IntegrationTypeContent>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel3-content"
            id="contextAndInterface"
          >
            <Typography variant="h6">Context And Interface</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ContextAndInterfaceContent
              catalogueItem={newCatalogueItem}
            ></ContextAndInterfaceContent>
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
