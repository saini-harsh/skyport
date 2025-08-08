import axios from "axios";
import { apiConnector } from "../apiconnector";
import {
  setSearch,
  setLoading,
  setTraceId,
  setErrors,
  resetFlightSearch,
} from "../../slices/flightSlice";
// import { setErrors } from "../../slices/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URLmulticurl = "https://admin.tripgoonline.com/api/search";
const URL = "https://admin.tripgoonline.com/api/flight_search";
const URLtjRound = "https://admin.tripgoonline.com/api/roundTripSearch";

export function flightSearch(searchData, isMulticurl, isRoundTJ, navigate) {
  console.log("searchdata in redux", searchData);
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(resetFlightSearch());
    try {
      const response = await axios.post(
        isMulticurl === true ? URLmulticurl : isRoundTJ ? URLtjRound : URL,
        searchData
      );
      console.log("FLIGHTSEARCH API RESPONSE............", response);

      if (response.data.success === false) {
        toast.error(response.data.message || "An unexpected error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      }

      if (isMulticurl === true) {
        dispatch(setSearch(response.data.Results));
        dispatch(setTraceId(response.data.TraceId));
        sessionStorage.setItem("traceId", response.data.TraceId);
      } else if (isRoundTJ === true) {
        dispatch(setSearch(response.data.data.searchResult));
        sessionStorage.setItem("traceId", response.data.data.TraceId);
          dispatch(setTraceId(response.data.data.TraceId))
      } else {
        dispatch(setSearch(response.data.data.searchResult));
        sessionStorage.setItem("traceId", response.data.data.TraceId);
         dispatch(setTraceId(response.data.data.TraceId))
        // dispatch(setTraceId(response.data.data.TraceId));
        // sessionStorage.setItem("traceId", response.data.data.TraceId);
      }
    } catch (error) {
      console.log("FLIGHTSEARCH API ERROR............", error);
      toast.error(error.message || "An unexpected error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
      dispatch(setErrors("Axios Error"));
    }
    dispatch(setLoading(false));
  };
}
