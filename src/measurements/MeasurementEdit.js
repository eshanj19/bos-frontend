import React from "react";
import {
  Edit,
  SelectInput,
  ReferenceInput,
  TextInput,
  SimpleForm,
  BooleanInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./MeasurementCreate";
import { required } from "ra-core";

const MeasurementEdit = ({ classes, ...props }) => (
  <Edit title="Measurement Edit" {...props}>
    <SimpleForm>
      <TextInput
        autoFocus
        source="label"
        formClassName={classes.label}
        validate={required()}
      />
      <TextInput source="uom" formClassName={classes.uom} />
      <TextInput
        source="input_type"
        formClassName={classes.input_type}
        validate={required()}
      />
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
  </Edit>
);

export default withStyles(styles)(MeasurementEdit);
