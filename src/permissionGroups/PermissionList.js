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

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./PermissionGroupCreate";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";

import React, { Component } from "react";

class PermissionList extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    this.props.handleCheckbox(name, event.target.checked);
  };

  render() {
    var { currentGroupPermissions, classes } = this.props;
    if (!currentGroupPermissions) {
      currentGroupPermissions = [];
    }

    return (
      <Grid container spacing={8}>
        {currentGroupPermissions.map(permission => {
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

export default withStyles(styles)(PermissionList);
