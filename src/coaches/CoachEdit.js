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
  Edit,
  TextInput,
  ShowButton,
  SimpleForm,
  BooleanInput,
  AutocompleteArrayInput,
  SelectInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, CardActions } from "@material-ui/core";
import api from "../api";
import ResetPasswordDialog from "../common/ResetPasswordDialog";
import { GENDER_CHOICES } from "../constants";
import { translate } from "react-admin";

const styles = {
  flex: { display: "flex", marginRight: "1rem" }
};

const CoachEditActions = translate(
  ({ basePath, data, translate, resource, onToggleDialog }) => {
    console.log(data);
    return (
      <CardActions style={{ justifyContent: "flex-end" }}>
        <ShowButton basePath={basePath} record={data} />
        <Button color="primary" onClick={() => onToggleDialog(data.key)}>
          {translate("ra.action.reset_password")}
        </Button>
      </CardActions>
    );
  }
);

const CoachEdit = translate(({ classes, translate, ...props }) => {
  const [showDialog, toggleDialog] = useState(false);
  const [password, handleChangePassword] = useState("");
  const [currentpassword, handlecurrentpassword] = useState("");
  const [confirmPassword, handleChangeConfirmPassword] = useState("");
  const [userKey, setUserKey] = useState(null);
  const [resourceChoices, setResourceChoices] = useState([]);
  const [permissionGroupChoices, setPermissionGroupChoices] = useState([]);

  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem("ngo_key");
    api.getResourcesByNgo(ngoKey).then(({ data }) => {
      console.log(data);
      const choices = data.map(d => ({ id: d.key, name: d.label }));
      setResourceChoices(choices);
    });
  }, []);
  useEffect(() => {
    handleChangePassword("");
    handleChangeConfirmPassword("");
    handlecurrentpassword("");
  }, [showDialog]);

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

  const resetPassword = () => {
    if (!password || password.length === 0) return;
    let passworddata = {
      password: password,
      currentpassword: currentpassword,
      confirmPassword: confirmPassword
    };
    api.resetPassword(userKey, passworddata).then(() => {
      toggleDialog(!showDialog);
    });
  };

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
    <div>
      <Edit
        undoable={false}
        title={translate("ra.edit coach")}
        actions={
          <CoachEditActions
            onToggleDialog={userKey => {
              toggleDialog(!showDialog);
              setUserKey(userKey);
            }}
            {...props}
          />
        }
        {...props}
      >
        <SimpleForm>
          <TextInput
            autoFocus
            label={translate("ra.title.first_name")}
            source="first_name"
            formClassName={classes.flex}
          />
          <TextInput
            label={translate("ra.title.middle_name")}
            source="middle_name"
            formClassName={classes.flex}
          />
          <TextInput
            label={translate("ra.title.last_name")}
            source="last_name"
            formClassName={classes.flex}
          />
          <SelectInput
            label={translate("ra.title.gender")}
            source="gender"
            choices={GENDER_CHOICES}
          />

          <AutocompleteArrayInput
            label={translate("ra.title.permission_group")}
            source="permission_groups"
            choices={permissionGroupChoices}
            onChange={handlePermissionGroupChoiceChange}
          />
          <AutocompleteArrayInput
            source="resources"
            label={translate("ra.title.resources")}
            choices={resourceChoices}
            onChange={handleResourceChoiceChange}
          />
          <BooleanInput
            source="is_active"
            label={translate("ra.action.active")}
            formClassName={classes.flex}
          />
        </SimpleForm>
      </Edit>
      <ResetPasswordDialog
        showDialog={showDialog}
        password={password}
        confirmPassword={confirmPassword}
        onChangePassword={handleChangePassword}
        onChangeConfirmPassword={handleChangeConfirmPassword}
        onChangCurrentPassword={handlecurrentpassword}
        toggleDialog={() => {
          toggleDialog(!showDialog);
        }}
        resetPassword={resetPassword}
      />
    </div>
  );
});

export default withStyles(styles)(CoachEdit);
