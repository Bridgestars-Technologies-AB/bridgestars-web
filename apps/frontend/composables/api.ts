import Axios from "axios";


const api = Axios.create({
  baseURL: "/backend/api/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  //withXSRFToken: true
});

export default api;

