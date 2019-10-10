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
import { useSnackbar } from "notistack";
import {
  SNACKBAR_ERROR,
  SNACKBAR_SUCCESS,
  API_ERROR_UNKNOWN,
  API_SUCCESS
} from "./constants";
import { enqueueSnackbar } from "notistack";

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

const getAthleteBaselineMeasurements = () => {
  const url = "/measurements/athlete_baseline/";
  return axios.get(`${url}`);
};

const getCoachBaselineMeasurements = () => {
  const url = "/measurements/coach_baseline/";
  return axios.get(`${url}`);
};

const resetPassword = (key, body) => {
  return axios.post(`/users/${key}/reset_password/`, body);
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
  const { data } = error;
  if (data && data.message) {
    showSnackbar(enqueueSnackbar, data.message, SNACKBAR_ERROR);
  } else {
    showSnackbar(enqueueSnackbar, API_ERROR_UNKNOWN, SNACKBAR_ERROR);
  }
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

const saveSession = data => {
  return axios.post("resources/", data);
};

const api = {
  handleSuccess,
  handleError,
  login,
  get,
  put,
  post,
  getAthleteBaseline,
  getCoachBaseline,
  getAthleteBaselineMeasurements,
  getCoachBaselineMeasurements,
  getNGOPermissionGroups,
  getAllPermissions,
  isAuthenticated,
  resetPassword,
  getForgotPasswordToken,
  isForgotPasswordTokenValid,
  forgotPassword,
  logout,
  createAthlete,
  createCoach,
  createNGO,
  createPermissionGroup,
  getMeasurementDropdownOptionsForNgo,
  getFileDropdownOptionsForNgo,
  saveSession
};

export default api;