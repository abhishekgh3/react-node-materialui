import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate();
  const httpClient = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:3000/",
        headers: {
          "Content-type": "application/json",
        },
      }),
    []
  );

  httpClient.interceptors.response.use(
    (response) => {
      if (response.data) {
        // return success
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        // reject errors & warnings
        return Promise.reject(response);
      }

      // default fallback
      return Promise.reject(response);
    },
    (error) => {
      if (error.code === "ERR_NETWORK") {
        navigate("/service-unavailable");
      } else if (error.response) {
        navigate("/internal-error");
      }
      return Promise.reject(error);
    }
  );
  return { httpClient };
};

export default useAxios;
