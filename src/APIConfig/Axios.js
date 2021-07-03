import axios from "axios";
import WaitingStatus from "../Stores/WaitingStatus";

// axios.defaults.baseURL = ;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_CARDATA_API ||
    "https://cardata.devinternal.carscan.ai​​",
  timeout: 60000,
  validateStatus: function (status) {
    return status >= 200 && status < 600; // default
  },
});

Axios.interceptors.request.use(
  function (config) {
    console.log("WaitingStatus REQUEST");
    WaitingStatus.next(true);
    return config;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    WaitingStatus.next(false);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    WaitingStatus.next(false);

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("WaitingStatus RESPONSE");

    WaitingStatus.next(false);
    return Promise.reject(error);
  }
);
export default Axios;
