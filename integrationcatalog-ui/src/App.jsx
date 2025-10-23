import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import GeneralSearchTrain from "./pages/GeneralSearchTrain";
import ServiceUnavailable from "./pages/ErrorPages/ServiceUnavailable";
import DefaultErrorPage from "./pages/ErrorPages/DefaultErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <DefaultErrorPage></DefaultErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/train", element: <GeneralSearchTrain></GeneralSearchTrain> },
      {
        path: "/service-unavailable",
        element: <ServiceUnavailable></ServiceUnavailable>,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
