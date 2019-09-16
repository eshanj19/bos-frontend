import React from "react";
import { Edit, TextInput, SimpleForm, BooleanInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./MeasurementTypeCreate";
import { required } from "ra-core";

const MeasurementTypeEdit = ({ classes, ...props }) => (
  <Edit title="Measurement Type Edit" {...props}>
    <SimpleForm>
      <TextInput
        autoFocus
        source="label"
        formClassName={classes.label}
        validate={required()}
      />
      <BooleanInput
        source="is_active"
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Edit>
);

export default withStyles(styles)(MeasurementTypeEdit);
