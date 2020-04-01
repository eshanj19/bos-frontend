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

import React, { Component, useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Create,
  SelectArrayInput,
  AutocompleteArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput
} from "react-admin";
import api from "../api";
import { translate } from "react-admin";
import { LOCAL_STORAGE_NGO_KEY } from "../constants";

export const styles = {
  label: { display: "block" },
  uom: { display: "block" },
  type: { display: "block" },
  is_active: { display: "block" },
  paper: {
    margin: 20,
    textAlign: "center"
  },
  checkbox: {
    marginLeft: 10,
    textAlign: "center"
  }
};

export const validateUserGroupCreation = values => {
  const errors = {};
  if (!values.label) {
    errors.label = ["Required"];
  }
  if (!values.input_type) {
    errors.input_type = ["Required"];
  }
  if (!values.types || values.types.length === 0) {
    errors.types = ["Required"];
  }
  return errors;
};

const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;

const UserGroupCreate = translate(({ classes, translate, ...props }) => {
  const [resourceChoices, setResourceChoices] = useState([]);
  const [userChoices, setUserChoices] = useState([]);
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    api.getResourcesByNgo(ngoKey).then(({ data }) => {
      console.log(data);
      const choices = data.map(d => ({ id: d.key, name: d.label }));
      setResourceChoices(choices);
    });
    api.getAllUsersByNgo(ngoKey).then(({ data }) => {
      const choices = data.map(d => ({
        id: d.key,
        name: `${d.first_name + d.last_name}`
      }));
      setUserChoices(choices);
    });
  }, []);
  const handleChoiceChange = data => {
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
    <Create
      undoable={false}
      {...props}
      title={translate("ra.create user group")}
    >
      <SimpleForm redirect="list" validate={validateUserGroupCreation}>
        <TextInput
          autoFocus
          label={translate("ra.title.label")}
          source="label"
          formClassName={classes.label}
        />
        <AutocompleteArrayInput
          source="users"
          label={translate("ra.title.users")}
          choices={userChoices}
          onChange={handleChoiceChange}
        />
        <AutocompleteArrayInput
          source="resources"
          label={translate("ra.title.resources")}
          choices={resourceChoices}
          onChange={handleChoiceChange}
        />
        <BooleanInput
          source="is_active"
          label={translate("ra.action.active")}
          formClassName={classes.is_active}
          defaultValue={true}
        />
      </SimpleForm>
    </Create>
  );
});
export default withStyles(styles)(UserGroupCreate);
