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
import { Edit, BooleanInput, SimpleForm, TextInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./AdminCreate";

const AdminEdit = ({ classes, ...props }) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="first_name" formClassName={classes.first_name} />
      <TextInput source="last_name" formClassName={classes.last_name} />
      <BooleanInput source="is_active" formClassName={classes.is_active} />
      <TextInput
        type="email"
        source="email"
        validation={{ email: true }}
        fullWidth={true}
        formClassName={classes.email}
      />
    </SimpleForm>
  </Edit>
);

export default withStyles(styles)(AdminEdit);
