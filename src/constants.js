export const API_URL = process.env.REACT_APP_API_URL;

export const AVAILABLE_LANGUAGES = [
  { label: "English", value: "en_IN" },
  { label: "मराठी", value: "mr_IN" }
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
