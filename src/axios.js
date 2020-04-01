import axios from "axios";
import {
  API_URL,
  AVAILABLE_LANGUAGES,
  LOCAL_STORAGE_LOCALE
} from "./constants";

const instance = axios.create({
  baseURL: API_URL
});

instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.withCredentials = true;
instance.all = axios.all;
instance.spread = axios.spread;

instance.interceptors.request.use(config => {
  config.headers.common["Accept-Language"] =
    localStorage.getItem(LOCAL_STORAGE_LOCALE) || AVAILABLE_LANGUAGES[0].value;
  return config;
});
instance.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response && error.response.status === 401) {
      window.location = "/login";
      localStorage.clear();
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
export default instance;
