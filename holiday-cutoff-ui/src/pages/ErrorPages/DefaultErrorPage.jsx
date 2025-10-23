import { useRouteError } from "react-router-dom";
import InternalError from "./InternalError";
import PageNotFound from "./PageNotFound";

export default function DefaultErrorPage() {
  const error = useRouteError();
  return (
    <>
      {error.status === 404 && <PageNotFound></PageNotFound>}
      {error.status === 500 && <InternalError></InternalError>}
    </>
  );
}
