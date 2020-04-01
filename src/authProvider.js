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

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS
} from "react-admin";
import api from "./api";
import { checkPermission } from "./utils";
import {
  LOCAL_STORAGE_LOCALE,
  LOCAL_STORAGE_USERNAME,
  LOCAL_STORAGE_USER_KEY,
  LOCAL_STORAGE_NGO_KEY,
  LOCAL_STORAGE_PERMISSIONS,
  LOCAL_STORAGE_NGO_NAME,
  LOCAL_STORAGE_FIRST_NAME
} from "./constants";

export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username } = params;
    const { password } = params;
    let loginData = { username: username, password: password };
    let bosResult = await api.login(loginData);
    let supersetResult = await api.supersetLogin(loginData);
    if (bosResult.status === 200 && supersetResult.status === 200) {
      // if (bosResult.status === 200) {
      let { data } = bosResult;
      if (data) {
        const {
          permissions,
          ngo,
          username,
          key,
          language,
          ngo_name,
          first_name
        } = data;
        localStorage.setItem(LOCAL_STORAGE_USERNAME, username);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, key);
        localStorage.setItem(LOCAL_STORAGE_NGO_KEY, ngo);
        localStorage.setItem(LOCAL_STORAGE_PERMISSIONS, permissions);
        localStorage.setItem(LOCAL_STORAGE_LOCALE, language);
        localStorage.setItem(LOCAL_STORAGE_NGO_NAME, ngo_name);
        localStorage.setItem(LOCAL_STORAGE_FIRST_NAME, first_name);

        return Promise.resolve();
      } else return Promise.reject();
    } else {
      return Promise.reject();
    }
  }
  if (type === AUTH_LOGOUT) {
    let supersetResult = await api.supersetLogout();
    console.log(supersetResult);
    if (supersetResult.status === 200) {
      localStorage.removeItem(LOCAL_STORAGE_USERNAME);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      localStorage.removeItem(LOCAL_STORAGE_NGO_KEY);
      localStorage.removeItem(LOCAL_STORAGE_PERMISSIONS);
      localStorage.removeItem(LOCAL_STORAGE_LOCALE);
      localStorage.removeItem(LOCAL_STORAGE_NGO_NAME);
      localStorage.removeItem(LOCAL_STORAGE_FIRST_NAME);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    const { data } = await api.isAuthenticated();
    const { is_authenticated } = data;
    if (!is_authenticated) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
  if (type === AUTH_GET_PERMISSIONS) {
    let permissions = localStorage
      .getItem(LOCAL_STORAGE_PERMISSIONS)
      .split(",");
    const authPermissions = {};
    const init = {
      enabled: false,
      show: false,
      list: false,
      create: false,
      edit: false,
      delete: false
    };

    // measurements
    const users = { ...init };
    const admins = { ...init };
    const measurements = { ...init };
    const ngos = { ...init };
    const athletes = { ...init };
    const coaches = { ...init };
    const curricula = { ...init };
    const files = { ...init };
    const registrationForms = { ...init };
    const measurementTypes = { ...init };
    const permissionGroups = { ...init };
    const userGroups = { ...init };
    const resources = { ...init };
    const sessions = { ...init };
    const readings = { ...init };
    const userHierarchies = { ...init };
    const requests = { ...init };

    authPermissions["requests"] = requests;

    if (checkPermission(permissions, "measurements.view_measurement")) {
      measurements["show"] = true;
      measurements["list"] = true;
      measurements["enabled"] = true;
    }
    if (checkPermission(permissions, "measurements.add_measurement")) {
      measurements["create"] = true;
      measurements["enabled"] = true;
    }
    if (checkPermission(permissions, "measurements.change_measurement")) {
      measurements["edit"] = true;
      measurements["enabled"] = true;
    }
    if (checkPermission(permissions, "measurements.delete_measurement")) {
      measurements["delete"] = true;
      measurements["enabled"] = true;
    }
    authPermissions["measurements"] = measurements;

    if (checkPermission(permissions, "measurements.view_measurementtype")) {
      measurementTypes["show"] = true;
      measurementTypes["list"] = true;
      measurementTypes["enabled"] = true;
    }
    if (checkPermission(permissions, "measurements.add_measurementtype")) {
      measurementTypes["create"] = true;
      measurementTypes["enabled"] = true;
    }
    if (checkPermission(permissions, "measurements.change_measurementtype")) {
      measurementTypes["edit"] = true;
      measurementTypes["enabled"] = true;
    }
    if (checkPermission(permissions, "measurements.delete_measurementtype")) {
      measurementTypes["delete"] = true;
      measurementTypes["enabled"] = true;
    }
    authPermissions["measurement_types"] = measurementTypes;

    if (checkPermission(permissions, "ngos.view_ngo")) {
      ngos["show"] = true;
      ngos["list"] = true;
      ngos["enabled"] = true;
    }
    if (checkPermission(permissions, "ngos.add_ngo")) {
      ngos["create"] = true;
      ngos["enabled"] = true;
    }
    if (checkPermission(permissions, "ngos.change_ngo")) {
      ngos["edit"] = true;
      ngos["enabled"] = true;
    }
    if (checkPermission(permissions, "ngos.delete_ngo")) {
      ngos["delete"] = true;
      ngos["enabled"] = true;
    }
    authPermissions["ngos"] = ngos;

    if (checkPermission(permissions, "users.view_permissiongroup")) {
      permissionGroups["show"] = true;
      permissionGroups["list"] = true;
      permissionGroups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_permissiongroup")) {
      permissionGroups["create"] = true;
      permissionGroups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_permissiongroup")) {
      permissionGroups["edit"] = true;
      permissionGroups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_permissiongroup")) {
      permissionGroups["delete"] = true;
      permissionGroups["enabled"] = true;
    }
    authPermissions["permission_groups"] = permissionGroups;

    if (checkPermission(permissions, "users.view_admin")) {
      admins["show"] = true;
      admins["list"] = true;
      admins["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_admin")) {
      admins["create"] = true;
      admins["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_admin")) {
      admins["edit"] = true;
      admins["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_admin")) {
      admins["delete"] = true;
      admins["enabled"] = true;
    }
    authPermissions["admins"] = admins;

    if (checkPermission(permissions, "users.view_coach")) {
      coaches["show"] = true;
      coaches["list"] = true;
      coaches["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_coach")) {
      coaches["create"] = true;
      coaches["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_coach")) {
      coaches["edit"] = true;
      coaches["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_coach")) {
      coaches["delete"] = true;
      coaches["enabled"] = true;
    }
    authPermissions["coaches"] = coaches;

    if (checkPermission(permissions, "users.view_athlete")) {
      athletes["show"] = true;
      athletes["list"] = true;
      athletes["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_athlete")) {
      athletes["create"] = true;
      athletes["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_athlete")) {
      athletes["edit"] = true;
      athletes["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_athlete")) {
      athletes["delete"] = true;
      athletes["enabled"] = true;
    }
    authPermissions["athletes"] = athletes;

    if (checkPermission(permissions, "users.view_customusergroup")) {
      userGroups["show"] = true;
      userGroups["list"] = true;
      userGroups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_customusergroup")) {
      userGroups["create"] = true;
      userGroups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_customusergroup")) {
      userGroups["edit"] = true;
      userGroups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_customusergroup")) {
      userGroups["delete"] = true;
      userGroups["enabled"] = true;
    }
    authPermissions["user_groups"] = userGroups;

    if (checkPermission(permissions, "users.view_userreading")) {
      readings["show"] = true;
      readings["list"] = true;
      readings["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_userreading")) {
      readings["create"] = true;
      readings["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_userreading")) {
      readings["edit"] = true;
      readings["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_userreading")) {
      readings["delete"] = true;
      readings["enabled"] = true;
    }
    authPermissions["readings"] = readings;

    if (
      athletes["enabled"] ||
      coaches["enabled"] ||
      admins["enabled"] ||
      userGroups["enabled"]
    ) {
      users["enabled"] = true;
    }
    authPermissions["users"] = users;

    if (coaches["create"]) {
      requests["show"] = true;
      requests["list"] = true;
      requests["create"] = false;
      requests["edit"] = true;
      requests["delete"] = true;
      requests["enabled"] = true;
    }

    if (checkPermission(permissions, "resources.view_registrationform")) {
      registrationForms["show"] = true;
      registrationForms["list"] = true;
      registrationForms["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.add_registrationform")) {
      registrationForms["create"] = true;
      registrationForms["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.change_registrationform")) {
      registrationForms["edit"] = true;
      registrationForms["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.delete_registrationform")) {
      registrationForms["delete"] = true;
      registrationForms["enabled"] = true;
    }
    authPermissions["registrationForms"] = registrationForms;

    if (checkPermission(permissions, "resources.view_resource")) {
      resources["show"] = true;
      resources["list"] = true;
      resources["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.add_resource")) {
      resources["create"] = true;
      resources["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.change_resource")) {
      resources["edit"] = true;
      resources["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.delete_resource")) {
      resources["delete"] = true;
      resources["enabled"] = true;
    }
    authPermissions["resources"] = resources;

    if (checkPermission(permissions, "resources.view_curriculum")) {
      curricula["show"] = true;
      curricula["list"] = true;
      curricula["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.add_curriculum")) {
      curricula["create"] = true;
      curricula["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.change_curriculum")) {
      curricula["edit"] = true;
      curricula["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.delete_curriculum")) {
      curricula["delete"] = true;
      curricula["enabled"] = true;
    }
    authPermissions["curricula"] = curricula;

    if (checkPermission(permissions, "resources.view_file")) {
      files["show"] = true;
      files["list"] = true;
      files["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.add_file")) {
      files["create"] = true;
      files["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.change_file")) {
      files["edit"] = true;
      files["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.delete_file")) {
      files["delete"] = true;
      files["enabled"] = true;
    }
    authPermissions["files"] = files;

    if (checkPermission(permissions, "resources.view_trainingsession")) {
      sessions["show"] = true;
      sessions["list"] = true;
      sessions["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.add_trainingsession")) {
      sessions["create"] = true;
      sessions["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.change_trainingsession")) {
      sessions["edit"] = true;
      sessions["enabled"] = true;
    }
    if (checkPermission(permissions, "resources.delete_trainingsession")) {
      sessions["delete"] = true;
      sessions["enabled"] = true;
    }
    authPermissions["sessions"] = sessions;

    if (checkPermission(permissions, "users.view_userhierarchy")) {
      userHierarchies["show"] = true;
      userHierarchies["list"] = true;
      userHierarchies["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_userhierarchy")) {
      userHierarchies["create"] = true;
      userHierarchies["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_userhierarchy")) {
      userHierarchies["edit"] = true;
      userHierarchies["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_userhierarchy")) {
      userHierarchies["delete"] = true;
      userHierarchies["enabled"] = true;
    }
    authPermissions["user_hierarchies"] = userHierarchies;
    return Promise.resolve(authPermissions);
  }
  return Promise.reject("Unkown method");
};
