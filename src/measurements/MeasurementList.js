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
import { translate } from "react-admin";

const MeasurementFilter = translate(({ translate, ...props }) => (
  <Filter {...props}>
    <SearchInput label={translate("ra.title.label")} source="label" alwaysOn />
    <BooleanInput
      alwaysOn
      label={translate("ra.action.active")}
      source="is_active"
    />
    <ReferenceInput
      label={translate("ra.title.type")}
      source="types"
      reference="measurement_types"
    >
      <SelectInput optionText="label" />
    </ReferenceInput>
  </Filter>
));

const styles = {
  nb_commands: { color: "purple" }
};

const MeasurementList = translate(
  ({ classes, permissions, translate, ...props }) => (
    <List
      {...props}
      filters={<MeasurementFilter />}
      title={translate("ra.title.measurements")}
      sort={{ field: "label", order: "ASC" }}
      perPage={25}
      filterDefaultValues={{ is_active: true }}
      exporter={false}
    >
      <Responsive
        medium={
          <Datagrid>
            <TextField
              label={translate("ra.title.label")}
              source="label"
              type="text"
            />

            <ReferenceArrayField
              label={translate("ra.title.type")}
              source="types"
              reference="measurement_types"
              target="key"
              linkType={false}
            >
              <SingleFieldList>
                <ChipField source="label" />
              </SingleFieldList>
            </ReferenceArrayField>

            <BooleanField
              source="is_active"
              label={translate("ra.action.active")}
            />
            <DateField
              label={translate("ra.title.created_on")}
              source="creation_time"
              showTime
            />
            <DateField
              label={translate("ra.title.last_mod")}
              source="last_modification_time"
              showTime
            />
            {hasAccess(permissions, "measurements.show") && <ShowButton />}
            {hasAccess(permissions, "measurements.edit") && <EditButton />}
          </Datagrid>
        }
      />
    </List>
  )
);

export default withStyles(styles)(MeasurementList);
