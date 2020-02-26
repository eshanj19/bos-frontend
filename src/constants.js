/*
 *  Copyright (c) 2020 Maverick Labs
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

export const API_URL = process.env.REACT_APP_API_URL;

export const AVAILABLE_LANGUAGES = [
  { label: "English", value: "en_IN" },
  { label: "हिंदी", value: "hi_IN" },
  { label: "ಕನ್ನಡ", value: "ka_IN" }
];

export const ATHLETE = "athlete";
export const COACH = "coach";
export const ADMIN = "ADMIN";
export const RESPONSE_STATUS_400 = 400;
export const API_ERROR_UNKNOWN = "Something went wrong";
export const API_SUCCESS = "Done";
export const SNACKBAR_ERROR = "error";
export const SNACKBAR_SUCCESS = "success";
export const SNACKBAR_INFO = "info";

export const PERMISSION_USER_ENABLED = "users.enabled";

export const PERMISSION_ADMIN_CREATE = "admins.create";
export const PERMISSION_ADMIN_DELETE = "admins.delete";
export const PERMISSION_ADMIN_EDIT = "admins.edit";
export const PERMISSION_ADMIN_ENABLED = "admins.enabled";
export const PERMISSION_ADMIN_LIST = "admins.list";
export const PERMISSION_ADMIN_SHOW = "admins.show";

export const PERMISSION_ATHLETE_CREATE = "athletes.create";
export const PERMISSION_ATHLETE_DELETE = "athletes.delete";
export const PERMISSION_ATHLETE_EDIT = "athletes.edit";
export const PERMISSION_ATHLETE_ENABLED = "athletes.enabled";
export const PERMISSION_ATHLETE_LIST = "athletes.list";
export const PERMISSION_ATHLETE_SHOW = "athletes.show";

export const PERMISSION_COACH_CREATE = "coaches.create";
export const PERMISSION_COACH_DELETE = "coaches.delete";
export const PERMISSION_COACH_EDIT = "coaches.edit";
export const PERMISSION_COACH_ENABLED = "coaches.enabled";
export const PERMISSION_COACH_LIST = "coaches.list";
export const PERMISSION_COACH_SHOW = "coaches.show";

export const PERMISSION_USER_GROUP_CREATE = "user_groups.create";
export const PERMISSION_USER_GROUP_DELETE = "user_groups.delete";
export const PERMISSION_USER_GROUP_EDIT = "user_groups.edit";
export const PERMISSION_USER_GROUP_ENABLED = "user_groups.enabled";
export const PERMISSION_USER_GROUP_LIST = "user_groups.list";
export const PERMISSION_USER_GROUP_SHOW = "user_groups.show";

export const RESOURCE_TYPE_FILE = "file";
export const RESOURCE_TYPE_TRAINING_SESSION = "session";
export const RESOURCE_TYPE_REGISTRATION_FORM = "registration";
export const RESOURCE_TYPE_CURRICULUM = "curriculum";

export const PERMISSION_REQUESTS_SHOW = "requests.show";
export const PERMISSION_REQUESTS_LIST = "requests.list";

export const PERMISSION_RESOURCE_CREATE = "resources.create";
export const PERMISSION_RESOURCE_DELETE = "resources.delete";
export const PERMISSION_RESOURCE_EDIT = "resources.edit";
export const PERMISSION_RESOURCE_ENABLED = "resources.enabled";
export const PERMISSION_RESOURCE_LIST = "resources.list";
export const PERMISSION_RESOURCE_SHOW = "resources.show";

export const PERMISSION_FILE_CREATE = "files.create";
export const PERMISSION_FILE_DELETE = "files.delete";
export const PERMISSION_FILE_EDIT = "files.edit";
export const PERMISSION_FILE_ENABLED = "files.enabled";
export const PERMISSION_FILE_LIST = "files.list";
export const PERMISSION_FILE_SHOW = "files.show";

export const PERMISSION_REGISTRATION_FORM_CREATE = "registrationForms.create";
export const PERMISSION_REGISTRATION_FORM_DELETE = "registrationForms.delete";
export const PERMISSION_REGISTRATION_FORM_EDIT = "registrationForms.edit";
export const PERMISSION_REGISTRATION_FORM_ENABLED = "registrationForms.enabled";
export const PERMISSION_REGISTRATION_FORM_LIST = "registrationForms.list";
export const PERMISSION_REGISTRATION_FORM_SHOW = "registrationForms.show";

export const PERMISSION_TRAINING_SESSION_CREATE = "sessions.create";
export const PERMISSION_TRAINING_SESSION_DELETE = "sessions.delete";
export const PERMISSION_TRAINING_SESSION_EDIT = "sessions.edit";
export const PERMISSION_TRAINING_SESSION_ENABLED = "sessions.enabled";
export const PERMISSION_TRAINING_SESSION_LIST = "sessions.list";
export const PERMISSION_TRAINING_SESSION_SHOW = "sessions.show";

export const PERMISSION_CURICULA_CREATE = "curicula.create";
export const PERMISSION_CURICULA_DELETE = "curicula.delete";
export const PERMISSION_CURICULA_EDIT = "curicula.edit";
export const PERMISSION_CURICULA_ENABLED = "curicula.enabled";
export const PERMISSION_CURICULA_LIST = "curicula.list";
export const PERMISSION_CURICULA_SHOW = "curicula.show";

export const PERMISSION_USER_HIERARCHY_CREATE = "user_hierarchy.create";
export const PERMISSION_USER_HIERARCHY_DELETE = "user_hierarchy.delete";
export const PERMISSION_USER_HIERARCHY_EDIT = "user_hierarchy.edit";
export const PERMISSION_USER_HIERARCHY_ENABLED = "user_hierarchy.enabled";
export const PERMISSION_USER_HIERARCHY_LIST = "user_hierarchy.list";
export const PERMISSION_USER_HIERARCHY_SHOW = "user_hierarchy.show";

export const PERMISSION_MEASUREMENT_CREATE = "measurements.create";
export const PERMISSION_MEASUREMENT_DELETE = "measurements.delete";
export const PERMISSION_MEASUREMENT_EDIT = "measurements.edit";
export const PERMISSION_MEASUREMENT_ENABLED = "measurements.enabled";
export const PERMISSION_MEASUREMENT_LIST = "measurements.list";
export const PERMISSION_MEASUREMENT_SHOW = "measurements.show";

export const PERMISSION_READING_CREATE = "readings.create";
export const PERMISSION_READING_DELETE = "readings.delete";
export const PERMISSION_READING_EDIT = "readings.edit";
export const PERMISSION_READING_ENABLED = "readings.enabled";
export const PERMISSION_READING_LIST = "readings.list";
export const PERMISSION_READING_SHOW = "readings.show";

export const PERMISSION_NGO_CREATE = "ngos.create";
export const PERMISSION_NGO_DELETE = "ngos.delete";
export const PERMISSION_NGO_EDIT = "ngos.edit";
export const PERMISSION_NGO_ENABLED = "ngos.enabled";
export const PERMISSION_NGO_LIST = "ngos.list";
export const PERMISSION_NGO_SHOW = "ngos.show";

export const PERMISSION_PERMISSION_GROUP_CREATE = "permission_groups.create";
export const PERMISSION_PERMISSION_GROUP_DELETE = "permission_groups.delete";
export const PERMISSION_PERMISSION_GROUP_EDIT = "permission_groups.edit";
export const PERMISSION_PERMISSION_GROUP_ENABLED = "permission_groups.enabled";
export const PERMISSION_PERMISSION_GROUP_LIST = "permission_groups.list";
export const PERMISSION_PERMISSION_GROUP_SHOW = "permission_groups.show";

export const PERMISSION_MEASUREMENT_TYPE_CREATE = "measurement_types.create";
export const PERMISSION_MEASUREMENT_TYPE_DELETE = "measurement_types.delete";
export const PERMISSION_MEASUREMENT_TYPE_EDIT = "measurement_types.edit";
export const PERMISSION_MEASUREMENT_TYPE_ENABLED = "measurement_types.enabled";
export const PERMISSION_MEASUREMENT_TYPE_LIST = "measurement_types.list";
export const PERMISSION_MEASUREMENT_TYPE_SHOW = "measurement_types.show";

export const localeEN_IN = "en_IN";
export const localeHI_IN = "hi_IN";
export const localeKA_IN = "ka_IN";

export const GENDER_CHOICES = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" }
];

export const VALID_PDF_EXTENSIONS = [".pdf"];
export const VALID_VIDEO_EXTENSIONS = [".mp4"];
export const VALID_IMAGE_EXTENSIONS = [".png", ".jpeg", ".jpg"];
export const VALID_FILE_EXTENSIONS =
  VALID_PDF_EXTENSIONS + VALID_IMAGE_EXTENSIONS + VALID_VIDEO_EXTENSIONS;

export const LOCAL_STORAGE_LOCALE = "locale";
export const LOCAL_STORAGE_USERNAME = "username";
export const LOCAL_STORAGE_USER_KEY = "user_key";
export const LOCAL_STORAGE_NGO_KEY = "ngo_key";
export const LOCAL_STORAGE_PERMISSIONS = "permissions";
export const LOCAL_STORAGE_NGO_NAME = "ngo_name";
export const LOCAL_STORAGE_FIRST_NAME = "first_name";
