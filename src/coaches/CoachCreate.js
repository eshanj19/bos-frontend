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

import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import api from "../api";
import {
  Create,
  AutocompleteArrayInput,
  TextInput,
  SimpleForm,
  SelectInput
} from "react-admin";
import { GENDER_CHOICES, LOCAL_STORAGE_NGO_KEY } from "../constants";
import { translate } from "react-admin";

export const styles = {
  grid_element: { marginLeft: 32, marginTop: 10, marginBottom: 10 },
  root: {
    margin: "0 auto",
    width: "100%",
    backgroundColor: "white"
  },
  sectionHeader: {
    width: "100%",
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20
  },
  section1: {
    width: "100%",
    marginLeft: 20,
    marginRight: 20
  },
  section2: {
    width: "100%",
    margin: 20
  },
  icon: {
    fontSize: 20
  }
};

const validateCoachCreation = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = ["Required"];
  } else if (!values.last_name) {
    errors.last_name = ["Required"];
  } else if (!values.gender) {
    errors.gender = ["Required"];
  } else if (!values.username) {
    errors.username = ["Required"];
  } else if (!values.password) {
    errors.password = ["Required"];
  } else if (!values.confirm_password) {
    errors.confirm_password = ["Required"];
  }

  return errors;
};

const CoachCreate = translate(({ classes, translate, ...props }) => {
  const [permissionGroupChoices, setPermissionGroupChoices] = useState([]);
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    api.getPermissionGroups(ngoKey).then(({ data }) => {
      console.log(data);
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
    <Create undoable={false} {...props} title={translate("ra.create coach")}>
      <SimpleForm redirect="list" validate={validateCoachCreation}>
        <TextInput
          autoFocus
          source="first_name"
          label={translate("ra.title.first_name")}
          formClassName={classes.first_name}
        />
        <TextInput
          label={translate("ra.title.middle_name")}
          source="middle_name"
          formClassName={classes.generic}
        />
        <TextInput
          label={translate("ra.title.last_name")}
          source="last_name"
          formClassName={classes.last_name}
        />
        <SelectInput
          label={translate("ra.title.gender")}
          source="gender"
          choices={GENDER_CHOICES}
        />
        <TextInput
          label={translate("ra.title.username")}
          type="username"
          source="username"
          formClassName={classes.username}
        />
        <TextInput
          type="password"
          label={translate("ra.title.password")}
          source="password"
          formClassName={classes.password}
        />
        <TextInput
          type="password"
          label={translate("ra.title.confirm_password")}
          source="confirm_password"
          formClassName={classes.password}
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

export default withStyles(styles)(CoachCreate);
