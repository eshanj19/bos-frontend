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
  List,
  TextField,
  Responsive,
  Filter,
  SearchInput,
  BooleanInput,
  ShowButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";
import FullNameField from "../athletes/AthleteFullNameField";

const styles = {
  nb_commands: { color: "purple" }
};

const CoachFilter = props => (
  <Filter {...props}>
    <SearchInput label="Name" source="name" alwaysOn />
    <BooleanInput source="is_active" alwaysOn />
  </Filter>
);

const CoachList = ({ classes, permissions, ...props }) => (
  <List
    {...props}
    filters={<CoachFilter />}
    sort={{ field: "first_name", order: "ASC" }}
    perPage={25}
    filterDefaultValues={{ is_active: true }}
  >
    <Responsive
      medium={
        <Datagrid>
          <FullNameField label="Full name" sortBy="first_name" />
          <TextField source="email" type="text" />
          <DateField label="Created on" source="creation_time" showTime />
          <BooleanField source="is_active" label="Active?" />
          {hasAccess(permissions, "coaches.show") && <ShowButton />}
          {hasAccess(permissions, "coaches.edit") && <EditButton />}
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(CoachList);
