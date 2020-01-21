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
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid } from "@material-ui/core";
import { validationSchema } from "../validationSchemas";
import { Formik } from "formik";
import PermissionGroupCreateForm from "./PermissionGroupCreateForm";
import api from "../api";
import { removeNullValues, parseErrorResponse } from "../stringUtils";
import { RESPONSE_STATUS_400 } from "../constants";

export const styles = {
  label: { display: "block" },
  uom: { display: "block" },
  type: { display: "block" },
  is_active: { display: "block" },
  paper: {
    margin: 20,
    textAlign: "center"
  },
  checkbox: {
    marginLeft: 10,
    textAlign: "center"
  }
};

class PermissionGroupCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPermissions: [],
      list: []
    };
    this.handleIdentityChange = this.handleIdentityChange.bind(this);
  }

  componentDidMount() {
    api
      .getAllPermissions()
      .then(response => {
        // TODO Error handling
        var allPermissions = response.data;
        this.setState({
          allPermissions: allPermissions
        });
      })
      .catch(response => {
        console.log(response);
        api.handleError(response);
      });
  }

  onFormSubmit = (values, actions) => {
    var body = Object.assign({}, values);
    body = removeNullValues(body);
    console.log(body);
    var permissionGroupName = body["name"];
    delete body["name"];
    var checkedPermissions = [],
      checkedPermission;

    for (var permission in body) {
      checkedPermission = {};
      if (body[permission]) {
        checkedPermission["id"] = permission;
        checkedPermissions.push(checkedPermission);
      }
    }

    let finalBody = {};
    finalBody["name"] = permissionGroupName;
    finalBody["permissions"] = checkedPermissions;
    api
      .createPermissionGroup(finalBody)
      .then(response => {
        api.handleSuccess(response, this.props.enqueueSnackbar);
        this.props.history.push(this.props.basePath);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          if (error.response.status === RESPONSE_STATUS_400) {
            const errors = parseErrorResponse(error.response.data);
            actions.setErrors(errors);
          } else {
            api.handleError(error.response, this.props.enqueueSnackbar);
          }
          actions.setSubmitting(false);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  handleIdentityChange = event => {
    var dict = {};
    dict[event.target.name] = event.target.value;
    this.setState(dict);
  };

  render() {
    const { allPermissions } = this.state;
    const { classes, ...props } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Formik
          render={props => (
            <PermissionGroupCreateForm
              {...props}
              allPermissions={allPermissions}
            />
          )}
          validationSchema={validationSchema.AddPermissionGroup}
          onSubmit={this.onFormSubmit}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(PermissionGroupCreate);
