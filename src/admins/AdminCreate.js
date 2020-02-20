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

import React, { useState, useEffect } from "react";
import {
  Create,
  AutocompleteArrayInput,
  TextInput,
  SimpleForm,
  SelectInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import api from "../api";
import { GENDER_CHOICES } from "../constants";
import { translate } from "react-admin";

export const styles = {
  first_name: { display: "block" },
  generic: { display: "block" },
  last_name: { display: "block" },
  email: { display: "block" },
  is_active: { display: "block" }
};

export const validateAdminCreation = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = ["Required"];
  } else if (!values.last_name) {
    errors.last_name = ["Required"];
  } else if (!values.gender) {
    errors.gender = ["Required"];
  } else if (!values.username) {
    errors.username = ["Required"];
  } else if (!values.email) {
    errors.email = ["Required"];
  } else if (!values.password) {
    errors.password = ["Required"];
  } else if (!values.confirm_password) {
    errors.confirm_password = ["Required"];
  }

  return errors;
};

const AdminCreate = translate(({ classes, translate, ...props }) => {
  const [permissionGroupChoices, setPermissionGroupChoices] = useState([]);
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem("ngo_key");
    api.getPermissionGroups(ngoKey).then(({ data }) => {
      const choices = data.map(d => ({
        id: d.id,
        name: d.name.replace(ngoKey + "_", "")
      }));
      setPermissionGroupChoices(choices);
    });
  }, []);

  const handlePermissionGroupChoiceChange = data => {
    const arr = Object.values(data);
    if (arr.length > 2) {
      arr.pop();
      const value = arr.pop();
      if (value && arr.includes(value)) {
        data.preventDefault();
      }
    }
  };
  return (
    <Create undoable={false} {...props} title={translate("ra.create admin")}>
      <SimpleForm redirect="list" validate={validateAdminCreation}>
        <TextInput
          autoFocus
          label={translate("ra.title.first_name")}
          source="first_name"
          formClassName={classes.first_name}
        />
        <TextInput
          source="middle_name"
          label={translate("ra.title.middle_name")}
          formClassName={classes.generic}
        />
        <TextInput
          source="last_name"
          label={translate("ra.title.last_name")}
          formClassName={classes.last_name}
        />
        <SelectInput
          source="gender"
          label={translate("ra.title.gender")}
          choices={GENDER_CHOICES}
        />
        <TextInput
          type="username"
          source="username"
          label={translate("ra.title.username")}
          formClassName={classes.username}
        />
        <TextInput
          type="password"
          source="password"
          label={translate("ra.title.password")}
          formClassName={classes.password}
        />
        <TextInput
          type="password"
          source="confirm_password"
          label={translate("ra.title.confirm_password")}
          formClassName={classes.password}
        />
        <TextInput
          type="email"
          source="email"
          label={translate("ra.title.email")}
          formClassName={classes.email}
        />
        <AutocompleteArrayInput
          label={translate("ra.title.permission_group")}
          source="permission_groups"
          choices={permissionGroupChoices}
          onChange={handlePermissionGroupChoiceChange}
        />
      </SimpleForm>
    </Create>
  );
});

export default withStyles(styles)(AdminCreate);
