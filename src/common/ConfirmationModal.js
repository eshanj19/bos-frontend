import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Grid,
  DialogActions
} from "@material-ui/core";
import { withTranslate } from "react-admin";

class ConfirmationModal extends Component {
  render() {
    const {
      translate,
      handleYesClick,
      handleNoClick,
      showConfirmationModal
    } = this.props;

    return (
      <div>
        <Dialog
          open={showConfirmationModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {translate("Are you sure?")}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleNoClick} color="primary">
              {translate("No")}
            </Button>
            <Button onClick={handleYesClick} color="primary" autoFocus>
              {translate("Yes")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withTranslate(ConfirmationModal);
