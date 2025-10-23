import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import DataGridComp from "../components/DataGridComp";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import DialogComp from "../components/DialogComp";
import SearchAppBar from "../components/SearchAppBar";
import SideDrawer from "../components/SideDrawer";

export default function Home() {
  return (
    <>
      <SearchAppBar></SearchAppBar>
      <CustomAlert></CustomAlert>
      <DataGridComp></DataGridComp>
      <SideDrawer></SideDrawer>
      <DialogComp></DialogComp>
      <DeleteConfirmationDialog></DeleteConfirmationDialog>
    </>
  );
}
