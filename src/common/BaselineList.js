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
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio
} from "@material-ui/core";
export const styles = {
  first_name: { marginLeft: 32, marginTop: 20 },
  last_name: { marginLeft: 32, marginTop: 20 },
  grid_element: { marginLeft: 32, marginTop: 10, marginBottom: 10 },
  email: { width: 544 },
  address: { maxWidth: 544 },
  zipcode: { display: "inline-block" },
  city: { marginLeft: 32, marginTop: 20 },
  comment: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  root: {
    margin: "0 auto",
    width: "100%",
    maxWidth: "70%",
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
  },
  empty_label: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.46429em",
    margin: "16px",
    marginLeft: "20px"
  },
  input_label : {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  grid_item : {
    marginTop : "10px",
    marginBottom : "10px",
    marginLeft : "32px"
  }
};

class BaselineList extends Component {
  handleChange = (name, { name: targetName, value }) => {
    if (!this.props.readOnly) {
      this.props.onBaselineInputChange(name, value);
    }
  };

  render() {
    var { baselineMeasurements, classes, readOnly } = this.props;
    console.log(baselineMeasurements);
    if (!baselineMeasurements || baselineMeasurements.length === 0) {
      return (
        <div className={this.props.classes.empty_label}>
          <span>No Baseline Measurements Recorded.</span>
        </div>
      );
    }

    return (
      <Grid container spacing={16}>
        {baselineMeasurements.map(measurement => {
          if (measurement.input_type === "text") {
            return (
              <Grid className={this.props.classes.grid_item} item lg={12} xs={12} sm={12} key={measurement.key}>
                <div>{measurement.label}</div>
                <TextField 
                  value={measurement.value || ""} 
                  placeholder='Enter value'
                  style={{marginTop:'8px'}}
                  onChange={({target}) => this.handleChange(measurement.key,target)}/>
              </Grid>
            );
          }
          if (measurement.input_type === "numeric") {
            return (
              <Grid className={this.props.classes.grid_item} item lg={12} xs={12} sm={12} key={measurement.key}>
                <div>{measurement.label}</div>
                <TextField 
                  value={measurement.value || ""} 
                  type='numeric'
                  style={{marginTop:'8px'}}
                  placeholder='Enter number'
                  onChange={({target}) => this.handleChange(measurement.key,target)}/>
              </Grid>
            );
          }
          if (measurement.input_type === "boolean") {
            return (
              <Grid className={this.props.classes.grid_item} item md={12} lg={12} xs={12} sm={12} key={measurement.key}>
                <div className={this.props.classes.input_label}>
                  {measurement.label}
                  <span 
                    style={{fontSize:'12px',color:'blue',cursor:'pointer',marginLeft:'8px'}}
                    onClick={() => {this.handleChange(measurement.key, {value:null})}}>
                    Clear
                  </span>
                </div>
                {/* <Select
                  key={measurement.key}
                  value={measurement.value}
                  onChange={({ target }) =>
                    this.handleChange(measurement.key, target)
                  }
                  style={{marginLeft:'16px'}}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={null}>---</MenuItem>
                </Select> */}
                <RadioGroup value={measurement.value} 
                  onChange={(({target}) => {this.handleChange(measurement.key, target)})}>
                  <FormControlLabel value={"true"} control={<Radio />} label="Yes" />
                  <FormControlLabel value={"false"} control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            );
          }
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(BaselineList);
