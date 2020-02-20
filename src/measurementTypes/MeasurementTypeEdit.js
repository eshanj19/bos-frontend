import React from "react";
import { Edit, TextInput, SimpleForm, BooleanInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./MeasurementTypeCreate";
import { required } from "ra-core";
import { translate } from "react-admin";

const MeasurementTypeEdit = translate(({ classes, translate, ...props }) => (
  <Edit
    undoable={false}
    title={translate("ra.edit measurement type")}
    {...props}
  >
    <SimpleForm>
      <TextInput
        autoFocus
        source="label"
        label={translate("ra.title.label")}
        formClassName={classes.label}
        validate={required()}
      />
      <BooleanInput
        source="is_active"
        label={translate("ra.action.active")}
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Edit>
));

export default withStyles(styles)(MeasurementTypeEdit);
