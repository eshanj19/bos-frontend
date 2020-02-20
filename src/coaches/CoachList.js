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
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  Responsive,
  Filter,
  SearchInput,
  BooleanInput,
  SelectField,
  ShowButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";
import FullNameField from "../common/FullNameField";
import {
  PERMISSION_COACH_EDIT,
  GENDER_CHOICES,
  PERMISSION_COACH_SHOW
} from "../constants";
import { translate } from "react-admin";

const styles = {
  nb_commands: { color: "purple" }
};

const CoachFilter = translate(({ translate, ...props }) => (
  <Filter {...props}>
    <SearchInput label={translate("ra.title.name")} source="name" alwaysOn />
    <BooleanInput
      source="is_active"
      label={translate("ra.action.active")}
      alwaysOn
    />
  </Filter>
));

const CoachList = translate(({ classes, permissions, translate, ...props }) => (
  <List
    {...props}
    filters={<CoachFilter />}
    title={translate("ra.menu.coaches")}
    sort={{ field: "first_name", order: "ASC" }}
    perPage={25}
    filterDefaultValues={{ is_active: true }}
    exporter={false}
  >
    <Responsive
      medium={
        <Datagrid>
          <FullNameField
            label={translate("ra.title.full_name")}
            sortBy="first_name"
          />
          <SelectField
            label={translate("ra.title.gender")}
            source="gender"
            choices={GENDER_CHOICES}
          />
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
          {hasAccess(permissions, PERMISSION_COACH_SHOW) && <ShowButton />}
          {hasAccess(permissions, PERMISSION_COACH_EDIT) && <EditButton />}
        </Datagrid>
      }
    />
  </List>
));

export default withStyles(styles)(CoachList);
