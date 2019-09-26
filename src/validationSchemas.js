import * as Yup from "yup";
import { isValid } from "./stringUtils";

const AddNgoSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email()
    .required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string().required("Required")
});

const AddPermissionGroup = Yup.object().shape({
  name: Yup.string().required("Required")
});

const ResetPasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .required("Required")
    .min(4, "Too Short!")
    .max(10, "Too Long!"),
  new_password: Yup.string()
    .required("Required")
    .min(4, "Too Short!")
    .max(10, "Too Long!"),
  confirm_password: Yup.string()
    .required("Required")
    .test(
      "passwords-match",
      "New password does not match with confirm password ",
      function(value) {
        return this.parent.new_password === value;
      }
    )
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .email("Invalid email")
});

const ForgotPasswordTokenSchema = Yup.object().shape({
  new_password: Yup.string()
    .required("Required")
    .min(4, "Too Short!")
    .max(10, "Too Long!"),
  confirm_password: Yup.string()
    .required("Required")
    .test(
      "passwords-match",
      "New password does not match with confirm password ",
      function(value) {
        return this.parent.new_password === value;
      }
    )
});

export const validationSchema = {
  AddNgo: AddNgoSchema,
  AddPermissionGroup: AddPermissionGroup,
  ResetPasswordSchema: ResetPasswordSchema,
  ForgotPasswordSchema: ForgotPasswordSchema,
  ForgotPasswordTokenSchema
};
