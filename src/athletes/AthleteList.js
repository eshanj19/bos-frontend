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
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  ShowButton,
  Filter,
  List,
  BooleanInput,
  Responsive,
  SearchInput,
  SelectField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import FullNameField from "../common/FullNameField";
import { hasAccess } from "ra-auth-acl";
import {
  PERMISSION_ATHLETE_EDIT,
  GENDER_CHOICES,
  PERMISSION_ATHLETE_SHOW
} from "../constants";

const AthleteFilter = props => (
  <Filter {...props}>
    <SearchInput label="Name" source="name" alwaysOn />
    <BooleanInput source="is_active" label="Active" alwaysOn />
  </Filter>
);

const styles = {
  nb_commands: { color: "purple" }
};

const AthleteList = ({ classes, permissions, ...props }) => (
  <List
    {...props}
    filters={<AthleteFilter />}
    sort={{ field: "first_name", order: "ASC" }}
    perPage={25}
    filterDefaultValues={{ is_active: true }}
    exporter={false}
  >
    <Responsive
      medium={
        <Datagrid>
          <FullNameField label="Full name" sortBy="first_name" />
          <SelectField source="gender" choices={GENDER_CHOICES} />
          <BooleanField source="is_active" label="Active" type="text" />
          <DateField source="creation_time" showTime />
          <DateField source="last_modification_time" showTime />
          {hasAccess(permissions, PERMISSION_ATHLETE_SHOW) && <ShowButton />}
          {hasAccess(permissions, PERMISSION_ATHLETE_EDIT) && <EditButton />}
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(AthleteList);
