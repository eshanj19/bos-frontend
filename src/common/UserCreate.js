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
import SaveIcon from "@material-ui/icons/Save";
import {
  Button,
  TextField,
  Divider,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Toolbar
} from "@material-ui/core";
import BaselineList from "./BaselineList";
import { ATHLETE, COACH, ADMIN } from "../constants";
import PermissionGroupList from "./PermissionGroupList";
import instance from "../axios";
export const styles = {
  grid_element: { marginLeft: 32, marginTop: 10, marginBottom: 10 },
  root: {
    margin: "0 auto",
    width: "100%",
    backgroundColor: "white"
  },
  sectionHeader: {
    width: "100%",
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20
  },
  section1: {
    width: "100%",
    marginLeft: 20,
    marginRight: 20
  },
  section2: {
    width: "100%",
    margin: 20
  },
  icon: {
    fontSize: 20
  }
};

class UserCreate extends Component {
  constructor(props) {
    super(props);
    const { basePath } = this.props;
    var role = null;
    if (basePath === "/athletes") {
      role = ATHLETE;
    }
    if (basePath === "/coaches") {
      role = COACH;
    }
    if (basePath === "/users") {
      role = ADMIN;
    }
    this.state = {
      baselineMeasurements: [],
      permissionGroups: [],
      role: role
    };
    this.handleIdentityChange = this.handleIdentityChange.bind(this);
    this.customAction = this.customAction.bind(this);
  }

  componentDidMount() {
    const { role } = this.state;
    var apiCalls = [];
    const ngoKey = localStorage.getItem("ngo_key");

    if (role === ATHLETE) {
      apiCalls.push(api.getAthleteRegistrationResource(ngoKey));
      apiCalls.push(api.getNGOPermissionGroups(ngoKey));
    }
    if (role === COACH) {
      apiCalls.push(api.getCoachRegistrationResource(ngoKey));
      apiCalls.push(api.getNGOPermissionGroups(ngoKey));
    }

    if (apiCalls.length) {
      instance
        .all(apiCalls)
        .then(
          instance.spread((resourceResponse, ngoPermissionGroups) => {
            // TODO Error handling
            var measurements = resourceResponse.data.resource.data.measurements;

            var measurementsAPICalls = [];
            for (let index = 0; index < measurements.length; index++) {
              const measurement = measurements[index];
              measurementsAPICalls.push(api.getMeasurement(measurement.key));
            }
            var permissionGroups = ngoPermissionGroups.data;
            if (measurementsAPICalls.length) {
              instance
                .all(measurementsAPICalls)
                .then(
                  instance.spread((...allResponses) => {
                    // TODO Error handling
                    console.log(allResponses);
                    console.log("Error Here");

                    var measurements = [];
                    for (let index = 0; index < allResponses.length; index++) {
                      const response = allResponses[index];
                      console.log(response);
                      measurements.push(response.data);
                    }
                    this.setState({
                      baselineMeasurements: measurements,
                      permissionGroups: permissionGroups
                    });
                  })
                )
                .catch(response => {
                  console.log(response);
                  api.handleError(response);
                });
            } else {
              // TODO
              console.log("Error 1");
            }
          })
        )
        .catch(response => {
          console.log(response);
          api.handleError(response);
        });
    } else {
      // TODO
      console.log("Error 2");
    }
  }

  handleIdentityChange = event => {
    var dict = {};
    dict[event.target.name] = event.target.value;
    this.setState(dict);
  };

  handleChange = (key, event) => {
    var { baselineMeasurements } = this.state;
    for (let index = 0; index < baselineMeasurements.length; index++) {
      const element = baselineMeasurements[index];
      if (element.key === key) {
        if (element.input_type === "boolean") {
          console.log("Value of ", event.target);
          element["value"] = event.target.value;
        } else {
          element["value"] = event.target.value;
        }
        console.log("Value of ", element["value"]);
        break;
      }
    }
    this.setState({ baselineMeasurements: baselineMeasurements });
  };

  customAction() {
    var {
      baselineMeasurements,
      permissionGroups,
      first_name,
      last_name,
      role,
      password,
      confirm_password,
      username
    } = this.state;
    var createData = {};
    var baselines = [];
    for (let index = 0; index < baselineMeasurements.length; index++) {
      const element = baselineMeasurements[index];
      if (element.input_type === "boolean") {
        if (element.value === true || element.value === false) {
          baselines.push(element);
        }
      } else if (element.value) {
        baselines.push(element);
      }
    }
    createData["baselines"] = baselines;
    createData["first_name"] = first_name;
    createData["last_name"] = last_name;
    if (role === ATHLETE) {
      api.createAthlete(createData).then(result => {
        this.props.history.push(this.props.basePath);
      });
    } else if (role === COACH) {
      createData["password"] = password;
      createData["confirm_password"] = confirm_password;
      createData["username"] = username;
      api.createCoach(createData).then(result => {
        this.props.history.push(this.props.basePath);
      });
    }
  }

  render() {
    const { classes, ...props } = this.props;
    const { baselineMeasurements, permissionGroups, role } = this.state;
    console.log(role);
    var userTitle = null;
    if (role === ATHLETE) {
      userTitle = "Athlete";
    }
    if (role === ADMIN) {
      userTitle = "Admin";
    }
    if (role === COACH) {
      userTitle = "Coach";
    }
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <div className={classes.sectionHeader}>
              <Typography gutterBottom variant="headline">
                {userTitle} Identity
              </Typography>
            </div>
            <Divider variant="middle" />

            <Grid container spacing={8}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoFocus
                  name="first_name"
                  label="First Name"
                  className={classes.grid_element}
                  onChange={this.handleIdentityChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="last_name"
                  label="Last Name"
                  className={classes.grid_element}
                  onChange={this.handleIdentityChange}
                />
              </Grid>

              {role === COACH && (
                <div>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="username"
                      label="Username"
                      className={classes.grid_element}
                      onChange={this.handleIdentityChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="password"
                      label="Password"
                      className={classes.grid_element}
                      onChange={this.handleIdentityChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="confirm_password"
                      label="Confirm password"
                      className={classes.grid_element}
                      onChange={this.handleIdentityChange}
                    />
                  </Grid>
                </div>
              )}
            </Grid>
            <div className={classes.sectionHeader}>
              <Typography gutterBottom variant="headline">
                {userTitle} Baseline
              </Typography>
            </div>
            <Divider variant="middle" />

            <BaselineList
              baselineMeasurements={baselineMeasurements}
              handleCheckbox={this.handleChange}
              readOnly={false}
            />

            <Divider variant="middle" />

            {/* <div className={classes.sectionHeader}>
              <Typography gutterBottom variant="headline">
                Permission Group
              </Typography>
            </div>

            <PermissionGroupList
              permissionGroups={permissionGroups}
              handleCheckbox={this.handleChange}
              readOnly={false}
            /> */}
          </CardContent>
          <Toolbar style={{ background: "#f5f5f5" }}>
            <Button
              variant="raised"
              color="primary"
              className={classes.grid_element}
              onClick={this.customAction}
            >
              <SaveIcon className={classes.icon} />
              Save
            </Button>
          </Toolbar>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(UserCreate);
