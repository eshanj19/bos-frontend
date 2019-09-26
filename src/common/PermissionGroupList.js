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
  MenuItem
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
  }
};

class PermissionGroupList extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    if (!this.props.readOnly) {
      this.props.handleCheckbox(name, event);
    }
  };

  render() {
    var { permissionGroups, classes, readOnly } = this.props;
    if (!permissionGroups) {
      permissionGroups = [];
    }

    return (
      <Grid
        container
        spacing={8}
        direction="row"
        justify="left"
        alignItems="center"
      >
        {permissionGroups.map(permission => {
          return (
            <Grid item xs={4} key={permission.id}>
              <FormControlLabel
                className={classes.checkbox}
                key={permission.id}
                control={<Checkbox color="primary" />}
                label={permission.name}
                checked={permission.checked}
                onChange={this.handleChange(permission.id)}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(PermissionGroupList);
