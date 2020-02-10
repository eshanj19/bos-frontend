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
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  Responsive,
  SearchInput,
  ReferenceInput,
  SelectInput,
  ShowButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";

const MeasurementFilter = props => (
  <Filter {...props}>
    <SearchInput label="Label" source="label" alwaysOn />
    <BooleanInput alwaysOn label="Active" source="is_active" />
    <ReferenceInput label="Type" source="types" reference="measurement_types">
      <SelectInput optionText="label" />
    </ReferenceInput>
  </Filter>
);

const styles = {
  nb_commands: { color: "purple" }
};

const MeasurementList = ({ classes, permissions, ...props }) => (
  <List
    {...props}
    filters={<MeasurementFilter />}
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
    filterDefaultValues={{ is_active: true }}
    exporter={false}
  >
    <Responsive
      medium={
        <Datagrid>
          <TextField source="label" type="text" />

          <ReferenceArrayField
            label="Types"
            source="types"
            reference="measurement_types"
            target="key"
            linkType={false}
          >
            <SingleFieldList>
              <ChipField source="label" />
            </SingleFieldList>
          </ReferenceArrayField>

          <BooleanField source="is_active" label="Active" />
          <DateField source="creation_time" showTime />
          <DateField source="last_modification_time" showTime />
          {/* {hasAccess(permissions, "measurements.show") && <ShowButton />} */}
          {hasAccess(permissions, "measurements.edit") && <EditButton />}
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(MeasurementList);
