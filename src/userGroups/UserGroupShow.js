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

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./UserGroupCreate";
import {
  SelectArrayInput,
  ReferenceArrayInput,
  TextField,
  SimpleShowLayout,
  BooleanField,
  Show,
  ReferenceArrayField,
  ChipField
} from "react-admin";

const UserGroupShow = ({ classes, permissions, ...props }) => (
  <Show {...props}>
    <SimpleShowLayout redirect="list">
      <TextField autoFocus source="label" formClassName={classes.label} />
      {/* <ReferenceArrayInput
        formClassName={classes.type}
        label="Users"
        source="users"
        filter={{ is_active: true }}
        reference="coaches"
      >
        <SelectArrayInput optionText="first_name" />
      </ReferenceArrayInput> */}
      <ReferenceArrayField
        formClassName={classes.type}
        label="Resources"
        source="resources"
        filter={{ is_active: true, type: "session" }}
        reference="resources"
      >
        <ChipField optionText="label" />
      </ReferenceArrayField>
      <BooleanField
        source="is_active"
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleShowLayout>
  </Show>
);

export default withStyles(styles)(UserGroupShow);
