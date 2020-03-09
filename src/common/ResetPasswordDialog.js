import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Input,
  DialogActions
} from "@material-ui/core";
import { withTranslate } from "react-admin";

const ResetPasswordDialog = props => {
  const { translate } = props;
  return (
    <Dialog open={props.showDialog} onClose={() => props.toggleDialog()}>
      <DialogTitle>{translate("Reset password")}</DialogTitle>
      <DialogContent>
        <div>
          <Input
            value={props.currentpassword}
            type="password"
            onChange={({ target }) => {
              props.onChangCurrentPassword(target.value);
            }}
            placeholder={translate("Enter current password")}
          ></Input>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input
            value={props.password}
            type="password"
            onChange={({ target }) => {
              props.onChangePassword(target.value);
            }}
            placeholder={translate("Enter new password")}
          ></Input>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input
            value={props.confirmPassword}
            type="password"
            onChange={({ target }) => {
              props.onChangeConfirmPassword(target.value);
            }}
            placeholder={translate("Confirm new password")}
          ></Input>
        </div>

        <DialogActions>
          <Button
            color="primary"
            variant="raised"
            onClick={props.resetPassword}
          >
            Reset
          </Button>
          <Button
            // style={{ marginLeft: "0.8rem" }}
            color="primary"
            onClick={() => props.toggleDialog()}
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslate(ResetPasswordDialog);
