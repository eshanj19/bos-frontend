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

class RequestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      confirmpassword: "",
      password: "",
      flag: true,
      key: ""
    };
  }

  createUsername = () => {
    const {
      controllerProps: {
        record: { first_name, last_name, key }
      }
    } = this.props;

    const uname = first_name.concat("__" + last_name);
    this.setState({ username: uname });
    this.setState({ key: key });
    this.setState({ flag: false });
  };

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
    const { ...props } = this.props;

    return (
      <div>
        {this.state.flag == true ? this.createUsername() : null}
        <Dialog fullWidth open={props.showFlag}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "1em"
            }}
          >
            <DialogTitle>Choose username and password</DialogTitle>
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
                placeholder="enter password"
                value={this.state.password}
                onChange={this.onSetPassword}
              ></Input>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Input
                style={{ width: "250px" }}
                placeholder="confirm password"
                value={this.state.confirmpassword}
                onChange={this.onSetConfirmpwd}
              ></Input>
            </div>
          </DialogContent>
          <div style={{ marginLeft: "40px", marginBottom: "10px" }}>
            <Button color="primary" variant="raised" onClick={this.handleClick}>
              set
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default RequestModal;
