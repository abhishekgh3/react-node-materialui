import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alertActions } from "../store/alert";

const httpClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
});
const useAxios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        dispatch(
          alertActions.openErrorAlterWithMessage(error.response.data.message)
        );
      }
      return Promise.reject(error);
    }
  );
  return { httpClient };
};

export default useAxios;
