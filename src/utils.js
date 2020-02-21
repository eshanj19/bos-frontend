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

import { capitalizeString } from "./stringUtils";
import { VALID_IMAGE_EXTENSIONS, VALID_PDF_EXTENSIONS } from "./constants";

export const getGroupName = name => {
  const ngoKey = localStorage.getItem("ngo_key");
  var groupName = capitalizeString(name.replace(ngoKey + "_", ""));
  return groupName;
};

export const checkPermission = (permissions, permission) => {
  if (permissions.indexOf(permission) > -1) {
    return true;
  }
  return false;
};

export const RESOURCE_TYPES = {
  CIRRICULUM: 4
};

export const RESOURCE_ITEMS = {
  FILE: 4,
  MEASUREMENT: 3,
  SESSION: 2,
  DAY: 1
};

export const INPUT_TYPE = {
  TEXT: 1,
  DROPDOWN: 2,
  CREATABLE_DROPDOWN: 3
};

export const flat_hierarchy = [
  {
    key: "a1",
    label: "root",
    parent_node: null,
    children: [{ key: "a2" }, { key: "a3" }]
  },
  {
    key: "a2",
    label: "1st",
    parent_node: "a1",
    children: [{ key: "a21" }, { key: "a22" }]
  },
  {
    key: "a3",
    label: "2nd",
    parent_node: "a1",
    children: []
  },
  {
    key: "a21",
    label: "1-1st",
    parent_node: "a2",
    children: []
  },
  {
    key: "a22",
    label: "2-1st",
    parent_node: "a2",
    children: []
  },
  {
    key: "a1-sib",
    label: "2-1st",
    parent_node: null,
    children: [{ key: "a99" }]
  },
  {
    key: "a99",
    label: "2-99",
    parent_node: "a1-sib",
    children: []
  },
  {
    key: "a101",
    label: "2-101",
    parent_node: null,
    children: []
  }
];

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFileExtensionFromURL = url => {
  const fileExtension = url
    .toLowerCase()
    .split(".")
    .pop();
  return "." + fileExtension;
};

export const checkIfValidImageExtension = fileExtension => {
  for (let index = 0; index < VALID_IMAGE_EXTENSIONS.length; index++) {
    const validFileExtension = VALID_IMAGE_EXTENSIONS[index];
    if (validFileExtension === fileExtension) {
      return true;
    }
  }
  return false;
};

export const checkIfValidPDFExtension = fileExtension => {
  for (let index = 0; index < VALID_PDF_EXTENSIONS.length; index++) {
    const validFileExtension = VALID_PDF_EXTENSIONS[index];
    if (validFileExtension === fileExtension) {
      return true;
    }
  }
  return false;
};
