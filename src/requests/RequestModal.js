import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Input
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
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

    const username = first_name.concat("__" + last_name);
    let unamedata = {
      username: username
    };
    console.log(unamedata);
    api
      .check_username(key, unamedata)
      .then(Response => {
        console(Response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ username: username });
    this.setState({ key: key });

    this.setState({ flag: false });
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
    const { translate, ...props } = this.props;

    return (
      <div>
        <Dialog fullWidth open={props.showFlag}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "1em"
            }}
          >
            <DialogTitle>
              {translate("ra.Choose username and password")}
            </DialogTitle>
            <IconButton onClick={this.props.onCancel}>
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent style={{ margin: "1em" }}>
            <div>
              <Input
                style={{ width: "250px" }}
                type="name"
                value={this.state.username}
                onChange={this.onSetUsername}
              ></Input>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Input
                style={{ width: "250px" }}
                placeholder={translate("ra.title.enter_password")}
                value={this.state.password}
                onChange={this.onSetPassword}
              ></Input>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Input
                style={{ width: "250px" }}
                placeholder={translate("ra.title.confirm_password")}
                value={this.state.confirmpassword}
                onChange={this.onSetConfirmpwd}
              ></Input>
            </div>
          </DialogContent>
          <div style={{ marginLeft: "40px", marginBottom: "10px" }}>
            <Button color="primary" variant="raised" onClick={this.handleClick}>
              {translate("ra.action.set")}
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withTranslate(RequestModal);
