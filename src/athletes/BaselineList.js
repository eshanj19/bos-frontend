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
import {
  TextField,
  Grid,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
export const styles = {
  grid_element: { marginLeft: 32, marginTop: 10, marginBottom: 10 },
  empty_label : {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.46429em",
    marginTop:'15px',
  }
};

class BaselineList extends Component {
  handleChange = name => event => {
    if (!this.props.readOnly) {
      this.props.handleCheckbox(name, event);
    }
  };

  render() {
    var { baselineMeasurements, classes, readOnly } = this.props;
    if (!baselineMeasurements) {
      return (
        <div className={this.props.classes.empty_label}><span>No Baseline Measurements Recorded.</span></div>
      )
    }

    return (
      <Grid
        container
        spacing={8}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {baselineMeasurements.map(measurement => {
          if (measurement.input_type === "text") {
            return (
              <Grid item xs={12} sm={12}>
                <TextField
                  value={measurement.value}
                  label={measurement.label}
                  className={classes.grid_element}
                  onChange={this.handleChange(measurement.key)}
                  // disabled={readOnly}
                />
              </Grid>
            );
          }
          if (measurement.input_type === "numeric") {
            return (
              <Grid item xs={12} sm={12}>
                <TextField
                  label={measurement.label}
                  className={classes.grid_element}
                  value={measurement.value}
                  onChange={this.handleChange(measurement.key)}
                  // disabled={readOnly}
                />
              </Grid>
            );
          }
          if (measurement.input_type === "boolean") {
            return (
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={
                    <Select
                      value={measurement.value}
                      onChange={this.handleChange(measurement.key)}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                      <MenuItem value={null}>---</MenuItem>
                    </Select>
                  }
                  onChange={this.handleChange(measurement.key)}
                  className={classes.grid_element}
                  label={measurement.label}
                  labelPlacement="start"
                  // disabled={readOnly}
                />
              </Grid>
            );
          }
          return <div></div>;
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(BaselineList);
