/*
 *  Copyright (c) 2019 Maverick Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as,
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from "react";
import { Datagrid, List, Responsive, DateField, ChipField } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import FullNameField from "../common/FullNameField";
import GenderField from "../common/GenderField";
import {
  translate,
  Filter,
  SearchInput,
  SelectInput,
  ShowButton
} from "react-admin";
import { REQUEST_STATUS_CHOICES } from "../constants";
import RequestStatusField from "../common/RequestStatusField";

const styles = {
  nb_commands: { color: "purple" }
};

const RequestFilter = translate(({ translate, ...props }) => {
  var translatedRequestStatuses = [];
  REQUEST_STATUS_CHOICES.forEach(element => {
    const { id, name } = element;
    translatedRequestStatuses.push({
      id: id,
      name: translate(name)
    });
  });
  return (
    <Filter {...props}>
      <SearchInput label={translate("ra.title.name")} source="name" alwaysOn />
      <SelectInput
        label={translate("ra.title.status")}
        source="status"
        alwaysOn
        choices={translatedRequestStatuses}
      />
    </Filter>
  );
});

const RequestList = translate(
  ({ classes, permissions, translate, ...props }) => (
    <List
      {...props}
      sort={{ field: "creation_time", order: "DESC" }}
      perPage={25}
      filters={<RequestFilter />}
      filterDefaultValues={{ is_active: true }}
      exporter={false}
    >
      <Responsive
        medium={
          <Datagrid>
            <FullNameField label={translate("ra.title.full_name")} />
            <GenderField label={translate("ra.title.gender")} />
            <RequestStatusField
              label={translate("ra.title.status")}
              source="status"
            />
            <DateField
              label={translate("ra.title.date")}
              source="creation_time"
            />
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  )
);

export default withStyles(styles)(RequestList);
