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

import { styles } from "./PermissionGroupCreate";
import { Paper, Button } from "@material-ui/core";
import PermissionList from "./PermissionList";
import api from "../api";
import instance from "../axios";
import { getGroupName } from "../utils";

class PermissionGroupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroupPermissions: []
    };
  }

  handleCheckbox = (id, checked) => {
    var { currentGroupPermissions } = this.state;
    for (let index = 0; index < currentGroupPermissions.length; index++) {
      const permission = currentGroupPermissions[index];
      if (permission.id === id) {
        permission.checked = checked;
        this.setState({ currentGroupPermissions, currentGroupPermissions });
        break;
      }
    }
  };

  handleSaveButton = () => {
    var { match, currentGroupPermissions } = this.state;
    var checkedGroupPermissions = [];
    currentGroupPermissions.forEach(permission => {
      if (permission.checked) {
        checkedGroupPermissions.push(permission);
      }
    });
    api
      .put(match.url, checkedGroupPermissions)
      .then(({ response }) => {
        console.log(response);
      })
      .catch(({ response }) => {
        console.log(response);

        api.handleError(response);
      });
  };

  componentDidMount() {
    const { classes, id, match } = this.props;
    this.setState({
      classes: classes,
      id: id,
      match: match
    });

    instance
      .all([api.get(match.url), api.getAllPermissions()])
      .then(
        instance.spread((groupPermissionsResponse, allPermissionsResponse) => {
          var allPermissions = allPermissionsResponse.data;
          var groupPermissions = groupPermissionsResponse.data.permissions;
          var extendedGroupName = groupPermissionsResponse.data.name;
          var groupName = getGroupName(extendedGroupName);
          var checkedPermissionsList = [];
          allPermissions.forEach(masterPermission => {
            var checkedPermission = JSON.parse(
              JSON.stringify(masterPermission)
            );
            if (
              groupPermissions.some(
                groupPermission => groupPermission.id === masterPermission.id
              )
            ) {
              checkedPermission["checked"] = true;
            } else {
              checkedPermission["checked"] = false;
            }
            checkedPermissionsList.push(checkedPermission);
          });

          this.setState({
            currentGroupPermissions: checkedPermissionsList,
            groupName: groupName
          });
        })
      )
      .catch(({ response }) => {
        console.log(response);

        api.handleError(response);
      });
  }

  render() {
    const { currentGroupPermissions, groupName } = this.state;
    const props = this.props;
    return (
      <Paper>
        <h3> Permissions for group : {groupName} </h3>
        <PermissionList
          currentGroupPermissions={currentGroupPermissions}
          handleCheckbox={this.handleCheckbox}
          {...props}
        />
        <Button onClick={this.handleSaveButton} value="Save" />
      </Paper>
    );
  }
}

export default withStyles(styles)(PermissionGroupEdit);
