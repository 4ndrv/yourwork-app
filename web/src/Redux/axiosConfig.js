
import axios from "axios";
const token = "token " + localStorage.getItem('userToken');
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.baseURL = "http://13.114.242.162:4747/api";
// axios.defaults.baseURL = "http://localhost:4747/api";

export const api = axios;
