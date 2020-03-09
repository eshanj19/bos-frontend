import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Input,
  DialogActions
} from "@material-ui/core";
import { withTranslate } from "react-admin";
import api from "../api";

class RequestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      confirmpassword: "",
      password: "",
      flag: true,
      key: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      gender: "",
      status: ""
    };
  }

  componentDidMount() {
    const {
      controllerProps: {
        record: { first_name, last_name, key, status, gender, middle_name }
      }
    } = this.props;

    const uname = first_name.concat("_" + last_name);
    var username = uname.toLowerCase();
    username = username.trim();
    let unamedata = {
      username: username
    };
    api
      .checkUsername(key, unamedata)
      .then(Response => {})
      .catch(error => {});
    this.setState({ username: username, key: key, flag: false });
  }

  onSetPassword = event => {
    this.setState({ password: event.target.value });
  };

  onSetConfirmpwd = event => {
    this.setState({ confirmpassword: event.target.value });
  };

  onSetUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleClick = () => {
    this.props.submitRequestData(
      this.state.username,
      this.state.key,
      this.state.confirmpassword,
      this.state.password
    );
  };
  render() {
    const { translate, dismiss, ...props } = this.props;
    return (
      <div>
        <Dialog
          open={props.showFlag}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {translate("ra.Choose username and password")}
          </DialogTitle>
          <DialogContent style={{ margin: "1em" }}>
            <div>
              <Input
                type="name"
                value={this.state.username}
                onChange={this.onSetUsername}
              ></Input>
            </div>
            <div style={{ marginTop: "1em" }}>
              <Input
                placeholder={translate("ra.title.enter_password")}
                value={this.state.password}
                onChange={this.onSetPassword}
              ></Input>
            </div>
            <div style={{ marginTop: "1em" }}>
              <Input
                placeholder={translate("ra.title.confirm_password")}
                value={this.state.confirmpassword}
                onChange={this.onSetConfirmpwd}
              ></Input>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={dismiss} color="primary">
              {translate("Cancel")}
            </Button>
            <Button onClick={this.handleClick} color="primary" autoFocus>
              {translate("Approve")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withTranslate(RequestModal);
