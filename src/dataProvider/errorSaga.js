import { CRUD_CREATE_FAILURE } from "react-admin";
import { stopSubmit } from "redux-form";
import { put, takeEvery } from "redux-saga/effects";

export default function* errorSagas() {
  yield takeEvery(CRUD_CREATE_FAILURE, crudCreateFailure);
}

export function* crudCreateFailure(action) {
  var json = action.payload;

  console.log("in crudCreateFailure");
  console.log(json);
  var destructured = {};
  if (Array.isArray(json)) {
    for (let index = 0; index < json.length; index++) {
      const element = json[index];
      Object.keys(element).forEach(key => {
        destructured[key] = element[key];
      });
    }
  } else {
    destructured = json;
  }
  // json structure looks like this:
  // {
  //     username: "This username is already taken",
  // age: "Your age must be above 18 years old"}
  yield put(stopSubmit("record-form", destructured));
}
