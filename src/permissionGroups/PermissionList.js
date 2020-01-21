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
import { sizing, flexbox, spacing, width } from "@material-ui/system";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Paper
} from "@material-ui/core";

import React, { Component } from "react";
import { USER } from "../authSchema";
import find from "lodash/find";
import { cardStyle } from "./PermissionGroupCreateForm";

export var cardS = {
  display: "block"
};

class PermissionList extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    this.props.handleCheckbox(name, event.target.checked);
  };

  getCheckedPermission = () => {
    const { currentGroupPermissions, classes, flag } = this.props;
    const clubpermissions = [
      { key: "_group", name: "Group" },
      { key: "_curriculum", name: "Curriculum" },
      { key: "_ngoregistrationresource", name: "Ngo Registration" },
      { key: "_userhierarchy", name: "User Hierarchy" },
      { key: "_usergroup", name: "User Group" },
      { key: "_athlete", name: "Athlete" },
      { key: "_ngo", name: "Ngo" },
      { key: "_resource", name: "Resources" },
      { key: "_trainingsession", name: "Training session" },
      { key: "_userresource", name: "User Resources" },
      { key: "_coach", name: "Coach" },
      { key: "_userreading", name: "User Reading" },
      { key: "_user", name: "User" },
      { key: "_file", name: "File" },
      { key: "_admin", name: "Admin" },
      { key: "_measurement", name: "Measurements" }
    ];

    let currentGroupPermissionscpy = [...currentGroupPermissions];
    const mapped = clubpermissions.map(permission => {
      const list = currentGroupPermissionscpy.filter(function(abc) {
        return abc.codename.includes(permission.key);
      });

      for (let j = 0; j < list.length; j++) {
        for (let i = 0; i < currentGroupPermissionscpy.length; i++) {
          if (list[j].codename === currentGroupPermissionscpy[i].codename) {
            currentGroupPermissionscpy.splice(i, 1);
            break;
          }
        }
      }

      return (
        <Grid item display="block" sm={4} xs={12} md={4}>
          {flag ? (
            <Grid>
              <Card style={{ marginTop: 10, marginLeft: 8, padding: 50 }}>
                <CardContent>
                  <h2>{permission.name}</h2>
                  {list.map(permission => (
                    <FormControlLabel
                      key={permission.id}
                      control={<Checkbox color="primary" />}
                      label={permission.name}
                      checked={permission.checked}
                      onChange={this.handleChange(permission.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid>
              <Card style={{ marginTop: 10, marginLeft: 8, padding: 50 }}>
                <CardContent>
                  <h2>{permission.name}</h2>
                  {list.map(permission => (
                    <FormControlLabel
                      key={permission.id}
                      control={<Checkbox color="primary" />}
                      label={permission.name}
                      checked={permission.checked}
                    />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      );
    });

    return mapped;
  };

  render() {
    const { currentGroupPermissions, classes } = this.props;
    const userPermissions = currentGroupPermissions.filter(permission => {
      return USER.indexOf(permission.codename) > -1;
    });

    if (!currentGroupPermissions) {
      currentGroupPermissions = [];
    }

    return (
      <div>
        <Grid container>{this.getCheckedPermission()}</Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PermissionList);
