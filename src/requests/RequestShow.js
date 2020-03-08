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
  ShowView
} from "react-admin";
import api from "../api";
import { Typography, Grid } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import withStyles from "@material-ui/core/styles/withStyles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import { styles } from "../common/UserCreate";

import RequestData from "./RequestData";
import Paper from "@material-ui/core/Paper";
import RequestModal from "./RequestModal";

import DataField from "../common/DataField";
import { withSnackbar } from "notistack";
import { withTranslate } from "react-admin";
import { LOCAL_STORAGE_NGO_KEY } from "../constants";
import ConfirmationModal from "../common/ConfirmationModal";

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
      <div style={{ marginTop: 60 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1em"
          }}
        >
          <Typography variant="h1" component="h2">
            {translate("ra.applicant's details")}
          </Typography>
        </div>
        <div
          style={{
            borderLeftColor: "white",
            borderLeftStyle: "solid"
          }}
        >
          <ShowController {...props}>
            {controllerProps => (
              <ShowView
                {...props}
                {...controllerProps}
                title={translate("ra.title.request_show")}
              >
                <SimpleShowLayout>
                  <DateField
                    label={translate("ra.title.date")}
                    source="creation_time"
                  />
                  <DataField
                    label={translate("ra.title.first_name")}
                    source="first_name"
                  />
                  <DataField
                    label={translate("ra.title.middle_name")}
                    source="middle_name"
                  />
                  <DataField
                    label={translate("ra.title.last_name")}
                    source="last_name"
                  />
                  <DataField
                    label={translate("ra.title.status")}
                    source="status"
                  />
                  <DataField label={translate("ra.title.role")} source="role" />
                  <DataField
                    label={translate("ra.title.gender")}
                    source="gender"
                  />

                  {controllerProps.record &&
                    controllerProps.record.data.measurements != null && (
                      <Grid>
                        <Typography variant="caption" display="block">
                          {translate("ra.title.measurements")}
                        </Typography>
                        <Paper style={{ marginTop: 10 }}>
                          <Table label="Measurements">
                            <TableBody
                              style={{
                                background: "#E8EAF6	",
                                justifyContent: "center"
                              }}
                            >
                              {
                                <RequestData
                                  controllerProps={controllerProps}
                                  measurements={this.state.measurements}
                                  {...props}
                                />
                              }
                            </TableBody>
                          </Table>
                        </Paper>
                      </Grid>
                    )}
                  {controllerProps.record &&
                    controllerProps.record.status === "pending" && (
                      <div style={{ marginTop: 20, marginLeft: 50 }}>
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
                    onCancel={this.onCancel}
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
      </div>
    );
  }
}

export default withTranslate(withSnackbar(withStyles(styles)(RequestShow)));
