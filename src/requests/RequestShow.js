/*
 *  Copyright (c) 2019 Maverick Labs
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

import React, { Component } from "react";
import {
  SimpleShowLayout,
  DateField,
  ShowController,
  ShowView,
  TextField
} from "react-admin";
import api from "../api";
import { Typography, Grid } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { styles } from "../common/Styles";

import RequestData from "./RequestData";
import RequestModal from "./RequestModal";

import { withSnackbar } from "notistack";
import { withTranslate } from "react-admin";
import { LOCAL_STORAGE_NGO_KEY } from "../constants";
import ConfirmationModal from "../common/ConfirmationModal";
import GenderField from "../common/GenderField";
import RequestStatusField from "../common/RequestStatusField";

class RequestShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: [],
      data: [],
      showFlag: false,
      showConfirmationModal: false,
      username: "",
      password: "",
      confirmpassword: ""
    };
  }

  onCancel = () => {
    this.props.history.goBack();
  };
  showConfirmationModal = () => {
    this.setState({ showConfirmationModal: true });
  };
  dismissConfirmationModal = () => {
    this.setState({ showConfirmationModal: false });
  };
  dismissRequestModal = () => {
    this.setState({ showFlag: false });
  };

  rejectRequest = () => {
    const { enqueueSnackbar } = this.props;
    console.log(this.props);
    let userKey = this.props.id;

    api
      .requestReject(userKey)
      .then(response => {
        api.handleSuccess(response, enqueueSnackbar);
        this.onCancel();
      })
      .catch(error => {
        api.handleError(error, enqueueSnackbar);
      });
  };

  submitRequestData = (username, key, confirmPassword, password) => {
    const { enqueueSnackbar } = this.props;
    let submitData = {
      username: username,
      confirmpassword: confirmPassword,
      password: password
    };
    api
      .requestAccept(key, submitData)
      .then(response => {
        console.log(response);
        api.handleSuccess(response, enqueueSnackbar);
        this.onCancel();
      })
      .catch(error => {
        api.handleError(error, enqueueSnackbar);
      });
  };

  componentDidMount() {
    var localkey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);

    api
      .getMeasurementDropdownOptionsForNgo(localkey)
      .then(({ data }) => {
        this.setState({ measurements: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes, permissions, translate, ...props } = this.props;

    return (
      <div>
        <div className={classes.sectionHeader}>
          <Typography variant="h1" component="h2">
            {translate("ra.applicant's details")}
          </Typography>
        </div>
        <ShowController {...props}>
          {controllerProps => (
            <ShowView
              {...props}
              {...controllerProps}
              title={translate("ra.title.request_show")}
            >
              <SimpleShowLayout classes={classes}>
                <DateField
                  label={translate("ra.title.date")}
                  source="creation_time"
                />
                <TextField
                  label={translate("ra.title.first_name")}
                  source="first_name"
                />
                <TextField
                  label={translate("ra.title.middle_name")}
                  source="middle_name"
                />
                <TextField
                  label={translate("ra.title.last_name")}
                  source="last_name"
                />
                <RequestStatusField
                  label={translate("ra.title.status")}
                  source="status"
                  className={classes.requestStatus}
                />
                <TextField label={translate("ra.title.role")} source="role" />
                <GenderField
                  label={translate("ra.title.gender")}
                  source="gender"
                  className={classes.gender}
                />

                {controllerProps.record &&
                  controllerProps.record.data.measurements != null && (
                    <Grid style={{ marginTop: 10 }}>
                      <Typography
                        variant="caption"
                        display="block"
                        style={{ marginTop: 10 }}
                      >
                        {translate("ra.title.measurements")}
                      </Typography>
                      <Table label="Measurements" className={classes.table}>
                        <TableBody>
                          {
                            <RequestData
                              controllerProps={controllerProps}
                              measurements={this.state.measurements}
                              {...props}
                            />
                          }
                        </TableBody>
                      </Table>
                    </Grid>
                  )}
                {controllerProps.record &&
                  controllerProps.record.status === "pending" && (
                    <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                      <Button
                        color="primary"
                        variant="raised"
                        size="small"
                        onClick={() => this.setState({ showFlag: true })}
                      >
                        <ThumbUp
                          color="primary"
                          style={{ paddingRight: "0.5em", color: "white" }}
                        />
                        {translate("ra.action.accept")}
                      </Button>
                      <Button
                        color="primary"
                        variant="raised"
                        size="small"
                        style={{ marginLeft: 50 }}
                        onClick={this.showConfirmationModal}
                      >
                        <ThumbDown
                          color="primary"
                          style={{ paddingRight: "0.5em", color: "white" }}
                        />
                        {translate("ra.action.decline")}
                      </Button>
                    </div>
                  )}
                <RequestModal
                  showFlag={this.state.showFlag}
                  controllerProps={controllerProps}
                  submitRequestData={this.submitRequestData}
                  dismiss={this.dismissRequestModal}
                />

                <ConfirmationModal
                  showConfirmationModal={this.state.showConfirmationModal}
                  handleYesClick={this.rejectRequest}
                  handleNoClick={this.dismissConfirmationModal}
                />
              </SimpleShowLayout>
            </ShowView>
          )}
        </ShowController>
      </div>
    );
  }
}

export default withTranslate(withSnackbar(withStyles(styles)(RequestShow)));
