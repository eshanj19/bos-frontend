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

const logout = () => {
  return axios.post("/logout_view/");
};

const api = {
  login,
  get,
  put,
  getAthleteBaseline,
  getCoachBaseline,
  getAthleteBaselineMeasurements,
  getCoachBaselineMeasurements,
  getAllPermissions,
  isAuthenticated,
  resetPassword,
  getForgotPasswordToken,
  isForgotPasswordTokenValid,
  forgotPassword,
  logout,
  createAthlete,
  createCoach
};

export default api;
