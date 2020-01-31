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

import React, { Component, Fragment } from "react";
import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  SelectField,
  List,
  Responsive,
  Filter,
  Datagrid,
  DateField,
  RichTextField,
  ShowController,
  ShowView
} from "react-admin";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import api from "../api";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import withStyles from "@material-ui/core/styles/withStyles";
import { Drawer } from "@material-ui/core";
import PropTypes from "prop-types";

import { styles } from "../common/UserCreate";
import { GENDER_CHOICES } from "../constants";
import spacing from "@material-ui/core/styles/spacing";

class RequestShow extends Component {
  resetStatus = val => {
    const { onCancel, classes, permissions, ...props } = this.props;
    let userKey = this.props.id;

    let statusData = {
      status: val
    };
    api
      .resetStatus(userKey, statusData)
      .then(response => {
        console.log(response);
        this.props.onCancel();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { onCancel, classes, permissions, ...props } = this.props;
    var valone = "Rejected";
    var valtwo = "Accepted";

    return (
      <div style={{ marginTop: 50 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1em"
          }}
        >
          <h3>Applicant's Details</h3>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </div>
        <ShowController {...props}>
          {controllerProps => (
            <ShowView
              title="requests"
              {...props}
              {...controllerProps}
              style={{ width: 400, height: 660 }}
            >
              <SimpleShowLayout>
                <DateField label="Date" label="Date" source="creation_time" />

                <TextField
                  source="first_name"
                  label="First Name"
                  formclassName={classes.first_name}
                />
                <TextField
                  source="middle_name"
                  label="Middle Name"
                  formclassName={classes.middle_name}
                />

                <TextField
                  source="last_name"
                  label="Last Name"
                  formclassName={classes.last_name}
                />

                <TextField
                  source="role"
                  label="Role"
                  formclassName={classes.role}
                />
                <TextField
                  source="status"
                  label="Status"
                  formclassName={classes.status}
                />
                <TextField source="gender" label="Gender" />
                {controllerProps.record &&
                  controllerProps.record.status == "pending" && (
                    <div style={{ marginTop: 10, marginLeft: 50 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => this.resetStatus(valtwo)}
                      >
                        <ThumbUp
                          color="primary"
                          style={{ paddingRight: "0.5em", color: "green" }}
                        />
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 50 }}
                        onClick={() => this.resetStatus(valone)}
                      >
                        <ThumbDown
                          color="primary"
                          style={{ paddingRight: "0.5em", color: "red" }}
                        />
                        Reject
                      </Button>
                    </div>
                  )}
              </SimpleShowLayout>
            </ShowView>
          )}
        </ShowController>
      </div>
    );
  }
}

export default withStyles(styles)(RequestShow);
