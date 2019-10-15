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
        group,
        ngo,
        username,
        key,
        // language,
        ngo_name,
        is_reset_password,
        first_name
      } = data;
      // console.log(data);
      localStorage.setItem("username", username);
      localStorage.setItem("ngo_key", ngo);
      localStorage.setItem("permissions", permissions);
      return Promise.resolve();
    } else return Promise.reject();
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("username");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    let permissions = localStorage.getItem("permissions").split(",");
    // console.log(permissions);
    const authPermissions = {};
    const init = {
      enabled: false,
      show: false,
      list: false,
      create: false,
      edit: false,
      delete: false
    }
    // measurements
    const users = {...init};
    const admins = {...init};
    const measurements = {...init};
    const ngos = {...init};
    const athletes = {...init};
    const coaches = {...init};
    const curriculums = {...init};
    const files = {...init};
    const measurementTypes = {...init};
    const permission_groups = {...init};
    const resources = {...init};

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

    if (checkPermission(permissions, "users.bos_admin")) {
      ngos["show"] = true;
      ngos["list"] = true;
      ngos["enabled"] = true;
    }
    if (checkPermission(permissions, "users.bos_admin")) {
      ngos["create"] = true;
      ngos["enabled"] = true;
    }
    if (checkPermission(permissions, "users.bos_admin")) {
      ngos["edit"] = true;
      ngos["enabled"] = true;
    }
    if (checkPermission(permissions, "users.bos_admin")) {
      ngos["delete"] = true;
      ngos["enabled"] = true;
    }
    authPermissions["ngos"] = ngos;

    if (checkPermission(permissions, "users.bos_admin")) {
      permission_groups["show"] = true;
      permission_groups["list"] = true;
      permission_groups["create"] = true;
      permission_groups["edit"] = true;
      permission_groups["enabled"] = true;
      resources["show"] = true;
      resources["list"] = true;
      resources["create"] = true;
      resources["edit"] = true;
      resources["enabled"] = true;
    }
    authPermissions["permission_groups"] = permission_groups;
    authPermissions["resources"] = resources;

    if (checkPermission(permissions, "users.view_user")) {
      users["show"] = true;
      users["list"] = true;
      users["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_user")) {
      users["create"] = true;
      users["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_user")) {
      users["edit"] = true;
      users["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_user")) {
      users["delete"] = true;
      users["enabled"] = true;
    }
    authPermissions["users"] = users;

    if (checkPermission(permissions, "users.view_user")) {
      admins["show"] = true;
      admins["list"] = true;
      admins["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_user")) {
      admins["create"] = true;
      admins["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_user")) {
      admins["edit"] = true;
      admins["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_user")) {
      admins["delete"] = true;
      admins["enabled"] = true;
    }
    authPermissions["admins"] = admins;

    // TODO permissions
    if (checkPermission(permissions, "users.view_user")) {
      coaches["show"] = true;
      coaches["list"] = true;
      coaches["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_user")) {
      coaches["create"] = true;
      coaches["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_user")) {
      coaches["edit"] = true;
      coaches["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_user")) {
      coaches["delete"] = true;
      coaches["enabled"] = true;
    }
    authPermissions["coaches"] = coaches;

    // TODO permissions
    if (checkPermission(permissions, "users.view_user")) {
      athletes["show"] = true;
      athletes["list"] = true;
      athletes["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_user")) {
      athletes["create"] = true;
      athletes["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_user")) {
      athletes["edit"] = true;
      athletes["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_user")) {
      athletes["delete"] = true;
      athletes["enabled"] = true;
    }
    authPermissions["athletes"] = athletes;

    // TODO permissions
    if (checkPermission(permissions, "users.view_user")) {
      curriculums["show"] = true;
      curriculums["list"] = true;
      curriculums["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_user")) {
      curriculums["create"] = true;
      curriculums["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_user")) {
      curriculums["edit"] = true;
      curriculums["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_user")) {
      curriculums["delete"] = true;
      curriculums["enabled"] = true;
    }
    authPermissions["curriculums"] = curriculums;

    // TODO permissions
    if (checkPermission(permissions, "users.view_user")) {
      files["show"] = true;
      files["list"] = true;
      files["enabled"] = true;
    }
    if (checkPermission(permissions, "users.add_user")) {
      files["create"] = true;
      files["enabled"] = true;
    }
    if (checkPermission(permissions, "users.change_user")) {
      files["edit"] = true;
      files["enabled"] = true;
    }
    if (checkPermission(permissions, "users.delete_user")) {
      files["delete"] = true;
      files["enabled"] = true;
    }
    authPermissions["files"] = files;
    return Promise.resolve(authPermissions);
  }
  return Promise.reject("Unkown method");
};
