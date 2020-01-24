import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Input
} from "@material-ui/core";

export default function ResetPasswordDialog(props) {
  return (
    <Dialog
      fullWidth
      open={props.showDialog}
      onClose={() => props.toggleDialog()}
    >
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <div>
          <Input
            value={props.currentpassword}
            type="password"
            onChange={({ target }) => {
              props.onChangCurrentPassword(target.value);
            }}
            style={{ width: "250px" }}
            placeholder="Enter current password"
          ></Input>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input
            value={props.password}
            type="password"
            onChange={({ target }) => {
              props.onChangePassword(target.value);
            }}
            style={{ width: "250px" }}
            placeholder="Enter new password"
          ></Input>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input
            value={props.confirmPassword}
            type="password"
            onChange={({ target }) => {
              props.onChangeConfirmPassword(target.value);
            }}
            style={{ width: "250px" }}
            placeholder="Confirm new password"
          ></Input>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Button
            color="primary"
            variant="raised"
            onClick={props.resetPassword}
          >
            Reset
          </Button>
          <Button
            style={{ marginLeft: "0.8rem" }}
            color="primary"
            onClick={() => props.toggleDialog()}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
