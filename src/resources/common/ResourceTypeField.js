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
  RESOURCE_TYPE_TRAINING_SESSION,
  RESOURCE_TYPE_CURRICULUM,
  RESOURCE_TYPE_FILE,
  RESOURCE_TYPE_REGISTRATION_FORM
} from "../../constants";

const ResourceTypeField = ({ record }) => {
  if (record.type === RESOURCE_TYPE_TRAINING_SESSION) {
    return "Training session";
  } else if (record.type === RESOURCE_TYPE_FILE) {
    return "File";
  } else if (record.type === RESOURCE_TYPE_CURRICULUM) {
    return "Curriculum";
  } else if (record.type === RESOURCE_TYPE_REGISTRATION_FORM) {
    return "Registration form";
  }
};

export default ResourceTypeField;
