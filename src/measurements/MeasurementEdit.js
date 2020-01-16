import React from "react";
import {
  Edit,
  SelectArrayInput,
  ReferenceArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput,
  AutocompleteInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles, validateMeasurementCreation } from "./MeasurementCreate";

const MeasurementEdit = ({ classes, ...props }) => (
  <Edit title="Edit Measurement" {...props}>
    <SimpleForm validate={validateMeasurementCreation}>
      <TextInput autoFocus source="label" formClassName={classes.label} />
      <TextInput source="uom" formClassName={classes.uom} />
      <AutocompleteInput
       source="input_type"
       formClassName={classes.input_type}
       choices={[
        { id: 'text', name: 'Text' },
        { id: 'boolean', name: 'Boolean' },
        { id: 'numeric', name: 'Numeric' },
        ]}/>
      <ReferenceArrayInput
        formClassName={classes.type}
        label="Measurement Type"
        source="types"
        filter={{ is_active: true }}
        reference="measurement_types"
      >
        <SelectArrayInput optionText="label" />
      </ReferenceArrayInput>
      <BooleanInput
        source="is_active"
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Edit>
);

export default withStyles(styles)(MeasurementEdit);
