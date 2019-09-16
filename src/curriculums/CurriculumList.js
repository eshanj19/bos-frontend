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
  Responsive
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  nb_commands: { color: "purple" }
};

const CurriculumList = ({ classes, ...props }) => (
  <List {...props} sort={{ field: "last_seen", order: "DESC" }} perPage={25}>
    <Responsive
      medium={
        <Datagrid>
          <TextField source="first_name" type="text" />
          <TextField source="last_name" type="text" />
          <TextField source="email" type="text" />
          <DateField label="Created on" source="creation_time" showTime />
          <BooleanField source="is_active" label="Active?" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(CurriculumList);
