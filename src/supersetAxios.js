import axios from "axios";
import { SUPERSET_API_URL } from "./constants";

const instance = axios.create({
  baseURL: SUPERSET_API_URL
});
instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.withCredentials = true;
instance.all = axios.all;
instance.spread = axios.spread;

export default instance;
