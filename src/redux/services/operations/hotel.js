import axios from "axios";
// import { apiConnector } from "../apiconnector";
import {
  setHotelSearch,
  setLoading,
  setErrors,
  resetHotelSearch,
} from "../../slices/hotelSlice";
// import { setErrors } from "../../slices/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const URL = "https://admin.tripgoonline.com/api/Hotel/Search";

export function hotelSearch(searchData, navigate) {
  console.log("searchdata in hotel redux", searchData);
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(resetHotelSearch());
    try {
      const response = await axios.post(URL, searchData);
      console.log("HotelSearch API RESPONSE............", response.data);

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
      localStorage.setItem("batchKey", response.data.data.batchKey);
      dispatch(setHotelSearch(response.data.data.hotels));
    } catch (error) {
      console.log("HotelSearch API ERROR............", error);
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
