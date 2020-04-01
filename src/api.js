/*
 *  Copyright (c) 2019 Maverick Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as,
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from "./axios";
import supersetAxios from "./supersetAxios";
import {
  SNACKBAR_ERROR,
  SNACKBAR_SUCCESS,
  API_ERROR_UNKNOWN,
  API_SUCCESS
} from "./constants";

const toFormData = data => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    fd.append(key, value);
  });
  return fd;
};

const login = data => {
  return axios.post("/login/", toFormData(data));
};

const supersetLogin = data => {
  return supersetAxios.post("/login/", toFormData(data));
};

const supersetLogout = () => {
  return supersetAxios.get("/logout/");
};

const get = url => {
  return axios.get(`${url}`);
};

const post = url => {
  return axios.post(`${url}`);
};

const getAthleteBaseline = (basePath, id) => {
  const url = basePath + "/" + id + "/baseline/";
  return axios.get(`${url}`);
};

const getCoachBaseline = (basePath, id) => {
  const url = basePath + "/" + id + "/baseline/";
  return axios.get(`${url}`);
};

const getAthleteRegistrationResource = key => {
  const url = `/ngos/${key}/athlete_registration_resource`;
  return axios.get(`${url}`);
};

const getCoachRegistrationResource = key => {
  const url = `/ngos/${key}/coach_registration_resource`;
  return axios.get(`${url}`);
};

const resetPassword = (key, body) => {
  return axios.post(`/users/${key}/reset_password/`, toFormData(body));
};

const requestAccept = (key, body) => {
  return axios.post(`/requests/${key}/request_accept/`, toFormData(body));
};

const requestReject = key => {
  return axios.post(`/requests/${key}/request_reject/`);
};

const checkUsername = (key, body) => {
  return axios.post(`/requests/${key}/check_username/`, toFormData(body));
};

const put = (url, body) => {
  return axios.put(`${url}/`, body);
};

const isAuthenticated = () => {
  return axios.get(`/is_authenticated/`);
};

const getAllPermissions = () => {
  return axios.get(`/permission_groups/all_permissions/`);
};

const getNGOPermissionGroups = key => {
  return axios.get(`/ngos/${key}/permission_groups/`);
};

const getForgotPasswordToken = body => {
  return axios.post("/get_forgot_password_token/", toFormData(body));
};

const isForgotPasswordTokenValid = token => {
  return axios.get(`/is_forgot_password_token_valid?token=${token}`);
};

const forgotPassword = body => {
  return axios.post("/forgot_password/", toFormData(body));
};

const createAthlete = body => {
  return axios.post("/athletes/", body);
};

const createCoach = body => {
  return axios.post("/coaches/", body);
};

const createNGO = body => {
  return axios.post("/ngos/", body);
};

const createPermissionGroup = body => {
  return axios.post("/permission_groups/", body);
};

const logout = () => {
  return axios.post("/logout_view/");
};

const handleError = (error, enqueueSnackbar) => {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    const { data } = error.response;
    if (data && data.message) {
      showSnackbar(enqueueSnackbar, data.message, SNACKBAR_ERROR);
    } else {
      showSnackbar(enqueueSnackbar, API_ERROR_UNKNOWN, SNACKBAR_ERROR);
    }
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
};

const handleSuccess = (success, enqueueSnackbar) => {
  const { data } = success;
  if (data && data.message) {
    showSnackbar(enqueueSnackbar, data.message, SNACKBAR_SUCCESS);
  } else {
    showSnackbar(enqueueSnackbar, API_SUCCESS, SNACKBAR_SUCCESS);
  }
};

const showSnackbar = (enqueueSnackbar, message, variant) => {
  if (enqueueSnackbar) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      }
    });
  }
};

const getMeasurementDropdownOptionsForNgo = ngo_key => {
  return axios.get(`ngos/${ngo_key}/measurements/`);
};

const getFileDropdownOptionsForNgo = ngo_key => {
  return axios.get(`ngos/${ngo_key}/files/`);
};

const saveSession = (sessionKey, data) => {
  return axios.put(`resources/${sessionKey}/`, data);
};

const saveRegistrationForm = (sessionKey, data) => {
  return axios.put(`resources/${sessionKey}/`, data);
};

const createSession = data => {
  return axios.post("resources/", data);
};

const createRegistrationForm = data => {
  return axios.post("resources/", data);
};

const getSessionsForNgo = ngo_key => {
  return axios.get(`ngos/${ngo_key}/training_sessions/`);
};

const saveCurriculum = (curriculumKey, data) => {
  return axios.put(`resources/${curriculumKey}/`, data);
};

const createCurriculum = data => {
  return axios.post("resources/", data);
};

const deactivateResource = key => {
  return axios.post(`resources/${key}/deactivate/`);
};
const activateResource = key => {
  return axios.post(`resources/${key}/activate/`);
};

const getResource = key => {
  return axios.get(`/resources/${key}`);
};
const getMeasurement = key => {
  return axios.get(`/measurements/${key}`);
};
const getUserHierarchy = key => {
  return axios.get(`/ngos/${key}/user_hierarchy`);
};

const setAsCoachRegistrationSession = (ngoKey, body) => {
  return axios.post(
    `/ngos/${ngoKey}/mark_as_coach_registration_resource/`,
    body
  );
};

const setAsAthleteRegistrationSession = (ngoKey, body) => {
  return axios.post(
    `/ngos/${ngoKey}/mark_as_athlete_registration_resource/`,
    body
  );
};

const submitFile = file => {
  return axios.post(`/resources/`, file);
};

const editFile = (fileKey, file) => {
  return axios.put(`resources/${fileKey}/`, file);
};

const saveOrgHierarchy = (data, key) => {
  return axios.post(`/ngos/${key}/save_user_hierarchy/`, data);
};

const getResourcesByNgo = ngoKey => {
  return axios.get(`/ngos/${ngoKey}/all_resources/`);
};

const getPermissionGroups = ngoKey => {
  return axios.get(`/ngos/${ngoKey}/permission_groups/`);
};

const getAllUsersByNgo = ngoKey => {
  return axios.get(`/ngos/${ngoKey}/all_users/`);
};

const changeLanguage = (userKey, data) => {
  return axios.post(`/users/${userKey}/change_language/`, data);
};

const api = {
  handleSuccess,
  handleError,
  login,
  supersetLogin,
  supersetLogout,
  get,
  put,
  post,
  getAthleteBaseline,
  getResourcesByNgo,
  createSession,
  createRegistrationForm,
  getCoachBaseline,
  getAthleteRegistrationResource: getAthleteRegistrationResource,
  getCoachRegistrationResource: getCoachRegistrationResource,
  getNGOPermissionGroups,
  getAllPermissions,
  isAuthenticated,
  resetPassword,
  requestAccept,
  requestReject,
  checkUsername,
  getForgotPasswordToken,
  isForgotPasswordTokenValid,
  forgotPassword,
  logout,
  setAsAthleteRegistrationSession,
  setAsCoachRegistrationSession,
  createAthlete,
  getAllUsersByNgo,
  createCoach,
  createNGO,
  createPermissionGroup,
  getMeasurementDropdownOptionsForNgo,
  getFileDropdownOptionsForNgo,
  saveSession,
  saveRegistrationForm,
  getSessionsForNgo,
  createCurriculum,
  saveCurriculum,
  getResource,
  getMeasurement,
  deactivateResource,
  activateResource,
  getUserHierarchy,
  submitFile,
  saveOrgHierarchy,
  getPermissionGroups,
  editFile,
  changeLanguage
};

export default api;
