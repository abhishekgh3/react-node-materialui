import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
