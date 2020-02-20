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
import { translate } from "react-admin";

const ReadingFilter = translate(({ translate, ...props }) => (
  <Filter {...props}>
    <SearchInput
      label={translate("ra.title.athlete")}
      source="athlete"
      alwaysOn
    />
    <ReferenceInput
      label={translate("ra.title.measurements")}
      source="measurement"
      reference="measurements"
      alwaysOn
    >
      <SelectInput optionText="label" />
    </ReferenceInput>
    <BooleanInput
      alwaysOn
      source="is_active"
      label={translate("ra.action.active")}
    />
  </Filter>
));

const styles = {
  nb_commands: { color: "purple" }
};

const ReadingList = translate(
  ({ classes, permissions, translate, ...props }) => (
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
              label={translate("ra.title.athlete")}
              source="user"
              reference="athletes"
              target="key"
              linkType={false}
            >
              <FullNameField label="Full name" />
            </ReferenceField>

            <ReferenceField
              label={translate("ra.title.measurements")}
              source="measurement"
              reference="measurements"
              target="key"
              linkType={false}
            >
              <TextField source="label" />
            </ReferenceField>

            <TextField
              label={translate("ra.title.value")}
              source="value"
              type="text"
            />

            <BooleanField
              source="is_active"
              label={translate("ra.action.active")}
            />
            <DateField
              label={translate("ra.title.recorded_on")}
              source="recorded_at"
              showTime
            />
            <DateField
              label={translate("ra.title.created_on")}
              source="creation_time"
              showTime
            />
            {/* <DateField source="last_modification_time" showTime /> */}
            {/* {hasAccess(permissions, "readings.show") && <ShowButton />} */}
            {hasAccess(permissions, "readings.edit") && <EditButton />}
          </Datagrid>
        }
      />
    </List>
  )
);

export default withStyles(styles)(ReadingList);
