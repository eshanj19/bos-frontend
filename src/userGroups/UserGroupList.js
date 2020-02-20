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
  TextField,
  Responsive,
  ShowButton,
  DateField,
  BooleanField,
  Filter,
  SearchInput,
  SelectInput,
  BooleanInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";
import { translate } from "react-admin";

const styles = {
  nb_commands: { color: "purple" }
};

const UserGroupFilter = translate(({ translate, ...props }) => (
  <Filter {...props}>
    <SearchInput label={translate("ra.title.name")} source="label" alwaysOn />
    <BooleanInput
      label={translate("ra.action.active")}
      source="is_active"
      alwaysOn
    />
  </Filter>
));

const UserGroupList = translate(
  ({ classes, permissions, translate, ...props }) => (
    <List
      {...props}
      sort={{ field: "label", order: "ASC" }}
      title={translate("ra.List of user groups")}
      perPage={25}
      exporter={false}
      filters={<UserGroupFilter />}
      filterDefaultValues={{ is_active: true }}
    >
      <Responsive
        medium={
          <Datagrid>
            <TextField label={translate("ra.title.name")} source="label" />
            <BooleanField
              label={translate("ra.action.active")}
              source="is_active"
            />
            <DateField
              label={translate("ra.title.created_on")}
              source="creation_time"
              showTime
            />
            <DateField
              label={translate("ra.title.last_mod")}
              source="last_modification_time"
              showTime
            />
            {/* {hasAccess(permissions, "users.show") || true && <ShowButton />} */}
            {hasAccess(permissions, "users.edit") || (true && <EditButton />)}
          </Datagrid>
        }
      />
    </List>
  )
);

export default withStyles(styles)(UserGroupList);
