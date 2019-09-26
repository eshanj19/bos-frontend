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
  Show,
  SimpleShowLayout,
  BooleanField,
  Tab,
  TextField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./AthleteCreate";
import api from "../api";
import BaselineList from "./BaselineList";
import { Divider, Typography } from "@material-ui/core";

class AthleteShow extends Component {
  state = { athleteBaselineMeasurements: [] };

  componentDidMount() {
    const { basePath, id } = this.props;
    console.log(this.props);
    api.getAthleteBaseline(basePath, id).then(result => {
      var athleteBaselineMeasurements = [];
      for (let index = 0; index < result.data.length; index++) {
        const element = result.data[index];
        var athleteBaselineMeasurement = element.measurement;
        if (athleteBaselineMeasurement.input_type == "boolean") {
          if (element.value == "True") {
            athleteBaselineMeasurement["value"] = true;
          } else {
            athleteBaselineMeasurement["value"] = false;
          }
        } else {
          athleteBaselineMeasurement["value"] = element.value;
        }
        athleteBaselineMeasurements.push(athleteBaselineMeasurement);
      }
      this.setState({
        athleteBaselineMeasurements: athleteBaselineMeasurements
      });
    });
  }

  render() {
    const { classes, ...props } = this.props;
    const { athleteBaselineMeasurements } = this.state;
    return (
      <Show title="Athlete Show" {...props}>
        <SimpleShowLayout>
          <Typography gutterBottom variant="headline">
            Identity
          </Typography>
          <Divider variant="middle" />

          <TextField source="username" formClassName={classes.first_name} />
          <TextField source="first_name" formClassName={classes.first_name} />
          <TextField source="last_name" formClassName={classes.last_name} />
          <BooleanField source="is_active" formClassName={classes.is_active} />
          <Divider variant="middle" />
          <Typography gutterBottom variant="headline">
            Baseline
          </Typography>
          <Divider variant="middle" />
          <BaselineList
            athleteBaselineMeasurements={athleteBaselineMeasurements}
            handleCheckbox={null}
            readOnly={true}
          />
        </SimpleShowLayout>
      </Show>
    );
  }
}

export default withStyles(styles)(AthleteShow);
