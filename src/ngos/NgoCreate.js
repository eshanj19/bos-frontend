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
import api from "../api";
import { withSnackbar } from "notistack";

import { Card, CardContent, Grid } from "@material-ui/core";
import { validationSchema } from "../validationSchemas";
import { Formik } from "formik";
import NgoCreateForm from "./NgoCreateForm";
import { removeNullValues, parseErrorResponse } from "../stringUtils";
import { RESPONSE_STATUS_400 } from "../constants";

export const styles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  card: { maxWidth: "60%" },
  zipcode: { display: "inline-block" },
  city: { display: "inline-block", marginLeft: 32 },
  comment: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
};

class NgoCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFormSubmit = (values, actions) => {
    let body = Object.assign({}, values);
    body = removeNullValues(body);
    api
      .createNGO(body)
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Card className={classes.card}>
            <CardContent>
              <Formik
                render={props => <NgoCreateForm {...props} />}
                validationSchema={validationSchema.AddNgo}
                onSubmit={this.onFormSubmit}
              />
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(NgoCreate));