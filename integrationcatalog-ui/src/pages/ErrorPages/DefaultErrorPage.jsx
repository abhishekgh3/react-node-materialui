import { useRouteError } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ServiceUnavailable from "./ServiceUnavailable";
import InternalError from "./InternalError";

export default function DefaultErrorPage() {
  const error = useRouteError();
  return (
    <>
      {error.status === 404 && <PageNotFound></PageNotFound>}
      {error.status === 500 && <InternalError></InternalError>}
    </>
  );
}
