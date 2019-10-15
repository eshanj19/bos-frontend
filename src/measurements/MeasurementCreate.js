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
  SelectArrayInput,
  ReferenceArrayInput,
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
  is_active: { display: "block" }
};

export const validateMeasurementCreation = values => {
  const errors = {};
  if (!values.label) {
    errors.label = ["Required"];
  }
  if (!values.input_type) {
    errors.input_type = ["Required"];
  }
  if (!values.types || values.types.length === 0) {
    errors.types = ["Required"];
  }
  return errors;
};

const MeasurementCreate = ({ classes, ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="list" validate={validateMeasurementCreation}>
      <TextInput autoFocus source="label" formClassName={classes.label} />
      <TextInput source="uom" formClassName={classes.uom} />
      <TextInput
        source="input_type"
        formClassName={classes.input_type}
        validate={required()}
      />
      <ReferenceArrayInput
        formClassName={classes.type}
        label="Measurement Type"
        source="types"
        filter={{ is_active: true }}
        reference="measurement_types"
        validate={required()}
      >
        <SelectArrayInput optionText="label" />
      </ReferenceArrayInput>
      <BooleanInput
        source="is_active"
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Create>
);

export default withStyles(styles)(MeasurementCreate);
