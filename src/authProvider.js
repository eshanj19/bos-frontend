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

export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username } = params;
    const { password } = params;
    let loginData = { username: username, password: password };
    let result = await api.login(loginData);
    let { data } = result;
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
      localStorage.setItem("username", username);
      localStorage.setItem("user_key", key);
      localStorage.setItem("ngo_key", ngo);
      localStorage.setItem("permissions", permissions);
      localStorage.setItem("locale", language);
      localStorage.setItem("ngo_name", ngo_name);
      localStorage.setItem("first_name", first_name);

      return Promise.resolve();
    } else return Promise.reject();
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("username");
    localStorage.removeItem("user_key");
    localStorage.removeItem("ngo_key");
    localStorage.removeItem("permissions");
    localStorage.removeItem("language");
    localStorage.removeItem("ngo_name");
    localStorage.removeItem("first_name");
    return Promise.resolve();
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
    let permissions = localStorage.getItem("permissions").split(",");
    const authPermissions = {};
    const init = {
      enabled: false,
      show: false,
      list: false,
      create: false,
      edit: false,
      delete: false
    };

    const obj = {
      enabled: true,
      show: true,
      list: true,
      create: true,
      edit: true,
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
    const measurementTypes = { ...init };
    const permission_groups = { ...init };
    const user_groups = { ...init };
    const resources = { ...init };
    const sessions = { ...init };
    const readings = { ...init };
    const requests = { ...obj };

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
      permission_groups["show"] = true;
      permission_groups["list"] = true;
      permission_groups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_permissiongroup")) {
      permission_groups["create"] = true;
      permission_groups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_permissiongroup")) {
      permission_groups["edit"] = true;
      permission_groups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_permissiongroup")) {
      permission_groups["delete"] = true;
      permission_groups["enabled"] = true;
    }
    authPermissions["permission_groups"] = permission_groups;

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
      user_groups["show"] = true;
      user_groups["list"] = true;
      user_groups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_customusergroup")) {
      user_groups["create"] = true;
      user_groups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_customusergroup")) {
      user_groups["edit"] = true;
      user_groups["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_customusergroup")) {
      user_groups["delete"] = true;
      user_groups["enabled"] = true;
    }
    authPermissions["user_groups"] = user_groups;

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
      user_groups["enabled"]
    ) {
      users["enabled"] = true;
    }
    authPermissions["users"] = users;

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
    return Promise.resolve(authPermissions);
  }
  return Promise.reject("Unkown method");
};
