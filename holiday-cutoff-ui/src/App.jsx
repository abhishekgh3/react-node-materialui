import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultErrorPage from "./pages/ErrorPages/DefaultErrorPage";
import InternalError from "./pages/ErrorPages/InternalError";
import ServiceUnavailable from "./pages/ErrorPages/ServiceUnavailable";
import Home from "./pages/Home";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <DefaultErrorPage></DefaultErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/service-unavailable",
        element: <ServiceUnavailable></ServiceUnavailable>,
      },
      {
        path: "/internal-error",
        element: <InternalError></InternalError>,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
