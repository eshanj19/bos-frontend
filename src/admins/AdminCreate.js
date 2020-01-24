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
  SimpleForm
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { Checkbox } from "@material-ui/core";
import api from "../api";

export const styles = {
  first_name: { display: "block" },
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

const AdminCreate = ({ classes, ...props }) => {
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
    <Create {...props}>
      <SimpleForm redirect="list" validate={validateAdminCreation}>
        <TextInput
          autoFocus
          source="first_name"
          formClassName={classes.first_name}
        />
        <TextInput source="last_name" formClassName={classes.last_name} />
        <TextInput
          type="username"
          source="username"
          formClassName={classes.username}
        />
        <TextInput
          type="password"
          source="password"
          formClassName={classes.password}
        />
        <TextInput
          type="password"
          source="confirm_password"
          formClassName={classes.password}
        />
        <TextInput type="email" source="email" formClassName={classes.email} />
        <AutocompleteArrayInput
          label="Permission group"
          source="permission_groups"
          choices={permissionGroupChoices}
          onChange={handlePermissionGroupChoiceChange}
        />
      </SimpleForm>
    </Create>
  );
};

export default withStyles(styles)(AdminCreate);
