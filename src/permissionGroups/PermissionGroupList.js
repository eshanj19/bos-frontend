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

import React from "react";
import {
  Datagrid,
  EditButton,
  List,
  Responsive,
  ShowButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";
import PermissionGroupNameField from "./PermissionGroupNameField";
import { translate } from "react-admin";
import {
  PERMISSION_PERMISSION_GROUP_SHOW,
  PERMISSION_PERMISSION_GROUP_EDIT
} from "../constants";

const styles = {
  nb_commands: { color: "purple" }
};

const PermissionGroupList = translate(
  ({ classes, permissions, translate, ...props }) => (
    <List
      {...props}
      sort={{ field: "name", order: "ASC" }}
      title={translate("ra.List of permission groups")}
      perPage={25}
      exporter={false}
    >
      <Responsive
        medium={
          <Datagrid>
            <PermissionGroupNameField
              label={translate("ra.title.name")}
              source="name"
            />
            {hasAccess(permissions, PERMISSION_PERMISSION_GROUP_SHOW) && (
              <ShowButton />
            )}
            {hasAccess(permissions, PERMISSION_PERMISSION_GROUP_EDIT) && (
              <EditButton />
            )}
          </Datagrid>
        }
      />
    </List>
  )
);

export default withStyles(styles)(PermissionGroupList);
