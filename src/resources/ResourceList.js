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
  BooleanInput,
  SearchInput,
  Filter
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  nb_commands: { color: "purple" }
};

const ResourceFilter = props => (
  <Filter {...props}>
    <SearchInput label="Name" source="name" alwaysOn />
    <BooleanInput source="is_active" alwaysOn />
  </Filter>
);

const ResourcesList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
    filters={<ResourceFilter />}
    filterDefaultValues={{ is_active: true }}
  >
    <Responsive
      medium={
        <Datagrid>
          <TextField source="label" type="text" />
          <DateField label="Created on" source="creation_time" showTime />
          <DateField
            label="Modified on"
            source="last_modification_time"
            showTime
          />
          <BooleanField source="is_active" label="Active?" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(ResourcesList);
