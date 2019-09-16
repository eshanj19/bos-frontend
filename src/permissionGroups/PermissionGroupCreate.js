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
  Create,
  SelectInput,
  ReferenceInput,
  TextInput,
  SimpleForm,
  BooleanInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { required } from "ra-core";

export const styles = {
  label: { display: "block" },
  uom: { display: "block" },
  type: { display: "block" },
  is_active: { display: "block" },
  paper: {
    margin: 20,
    textAlign: "center"
  },
  checkbox: {
    marginLeft: 10,
    textAlign: "center"
  }
};

const PermissionGroupCreate = ({ classes, ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput
        autoFocus
        source="label"
        formClassName={classes.label}
        validate={required()}
      />
      <TextInput source="uom" formClassName={classes.uom} />
      <ReferenceInput
        formClassName={classes.type}
        label="Measurement Type"
        source="type"
        filter={{ is_active: true }}
        reference="measurement_types"
        validate={required()}
      >
        <SelectInput optionText="label" />
      </ReferenceInput>
      <BooleanInput
        source="is_active"
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Create>
);

export default withStyles(styles)(PermissionGroupCreate);
