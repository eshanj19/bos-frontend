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
import withStyles from "@material-ui/core/styles/withStyles";

import { styles, validateUserGroupCreation } from "./UserGroupCreate";
import {
  Edit,
  SelectArrayInput,
  ReferenceArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput,
  AutocompleteArrayInput
} from "react-admin";

const UserGroupEdit = ({ classes, permissions, ...props }) => {
  const [resourceChoices, setResourceChoices] = useState([]);
  useEffect(() => {
    //fetch possible resource choices.
  },[]);
  const handleResourceChoiceChange = data => {
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
    <Edit {...props}>
      <SimpleForm redirect="list" validate={validateUserGroupCreation}>
        <TextInput autoFocus source="label" formClassName={classes.label} />
        <ReferenceArrayInput
          formClassName={classes.type}
          label="Users"
          source="users"
          filter={{ is_active: true }}
          reference="coaches"
        >
          <SelectArrayInput optionText="first_name" />
        </ReferenceArrayInput>
        <AutocompleteArrayInput
          source="resources"
          choices={resourceChoices}
          onChange={handleResourceChoiceChange}
        />
        <BooleanInput
          source="is_active"
          formClassName={classes.is_active}
          defaultValue={true}
        />
      </SimpleForm>
    </Edit>
  );
};

export default withStyles(styles)(UserGroupEdit);
