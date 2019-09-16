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
  Filter,
  List,
  TextField,
  NullableBooleanInput,
  Responsive,
  SearchInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

const NgoFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <NullableBooleanInput source="is_active" />
  </Filter>
);

const styles = {
  nb_commands: { color: "purple" }
};

const NgoList = ({ classes, ...props }) => (
  <List
    {...props}
    filters={<NgoFilter />}
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
  >
    <Responsive
      medium={
        <Datagrid>
          <TextField source="label" type="text" />
          <TextField source="uom" type="text" />
          <BooleanField source="is_active" type="text" />
          <DateField source="creation_time" showTime />
          <DateField source="last_modification_time" showTime />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(NgoList);
