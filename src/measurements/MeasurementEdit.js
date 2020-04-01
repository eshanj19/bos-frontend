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
import { translate } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles, validateMeasurementCreation } from "./MeasurementCreate";

const MeasurementEdit = translate(({ classes, translate, ...props }) => (
  <Edit undoable={false} title={translate("ra.edit measurements")} {...props}>
    <SimpleForm validate={validateMeasurementCreation}>
      <TextInput
        autoFocus
        label={translate("ra.title.label")}
        source="label"
        formClassName={classes.label}
      />
      <TextInput
        label={translate("ra.title.uom")}
        source="uom"
        formClassName={classes.uom}
      />
      <AutocompleteInput
        label={translate("ra.title.inputtype")}
        source="input_type"
        formClassName={classes.input_type}
        choices={[
          { id: "text", name: "Text" },
          { id: "boolean", name: "Boolean" },
          { id: "numeric", name: "Numeric" }
        ]}
      />
      <ReferenceArrayInput
        formClassName={classes.type}
        label={translate("ra.menu.measurement_type")}
        source="types"
        filter={{ is_active: true }}
        reference="measurement_types"
      >
        <SelectArrayInput optionText="label" />
      </ReferenceArrayInput>
      <BooleanInput
        source="is_active"
        label={translate("ra.action.active")}
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Edit>
));

export default withStyles(styles)(MeasurementEdit);
