import React from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  Filter,
  List,
  TextField,
  BooleanInput,
  Responsive,
  SearchInput,
  ReferenceInput,
  SelectInput,
  ReferenceField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";
import FullNameField from "../common/FullNameField";

const ReadingFilter = props => (
  <Filter {...props}>
    <SearchInput label="Athlete" source="athlete" alwaysOn />
    <ReferenceInput
      label="Measurement"
      source="measurement"
      reference="measurements"
      alwaysOn
    >
      <SelectInput optionText="label" />
    </ReferenceInput>
    <BooleanInput alwaysOn source="is_active" label="Active" />
  </Filter>
);

const styles = {
  nb_commands: { color: "purple" }
};

const ReadingList = ({ classes, permissions, ...props }) => (
  <List
    {...props}
    filters={<ReadingFilter />}
    sort={{ field: "creation_time", order: "DSC" }}
    perPage={25}
    filterDefaultValues={{ is_active: true }}
    exporter={false}
  >
    <Responsive
      medium={
        <Datagrid>
          <ReferenceField
            label="Athlete"
            source="user"
            reference="athletes"
            target="key"
            linkType={false}
          >
            <FullNameField label="Full name" />
          </ReferenceField>

          <ReferenceField
            label="Measurement"
            source="measurement"
            reference="measurements"
            target="key"
            linkType={false}
          >
            <TextField source="label" />
          </ReferenceField>

          <TextField source="value" type="text" />

          <BooleanField source="is_active" label="Active" />
          <DateField source="creation_time" showTime />
          <DateField source="last_modification_time" showTime />
          {/* {hasAccess(permissions, "readings.show") && <ShowButton />} */}
          {hasAccess(permissions, "readings.edit") && <EditButton />}
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(ReadingList);
