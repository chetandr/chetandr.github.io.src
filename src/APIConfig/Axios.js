import axios from 'axios';

// axios.defaults.baseURL = ;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const  Axios = axios.create({
    baseURL: process.env.REACT_APP_CARDATA_API || "https://cardata.devinternal.carscan.ai​​",
    timeout: 60000,
  });

export default Axios;
