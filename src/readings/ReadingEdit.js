import React from "react";
import {
  Edit,
  SelectArrayInput,
  ReferenceArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

export const styles = {
  label: { display: "block" },
  uom: { display: "block" },
  type: { display: "block" },
  is_active: { display: "block" }
};

export const validateReadingCreation = values => {
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

const ReadingEdit = ({ classes, ...props }) => (
  <Edit title="Reading Edit" {...props}>
    <SimpleForm validate={validateReadingCreation}>
      <TextInput autoFocus source="label" formClassName={classes.label} />
      <TextInput source="uom" formClassName={classes.uom} />
      <TextInput source="input_type" formClassName={classes.input_type} />
      <ReferenceArrayInput
        formClassName={classes.type}
        label="Reading Type"
        source="types"
        filter={{ is_active: true }}
        reference="Reading_types"
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

export default withStyles(styles)(ReadingEdit);
