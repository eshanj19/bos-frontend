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
  SelectInput,
  Toolbar,
  SaveButton,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, CardActions } from "@material-ui/core";
import api from "../api";

import { validateAdminCreation } from "./AdminCreate";
import { GENDER_CHOICES, LOCAL_STORAGE_NGO_KEY } from "../constants";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { translate } from "react-admin";
import DeleteButtonWithConfirmation from "../common/DeleteButtonWithConfirmation";
import AdminResetPasswordDialog from "../common/AdminResetPasswordDialog";

const styles = {
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
};

const AdminEditActions = translate(
  ({ basePath, data, translate, resource, onToggleDialog }) => {
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

const toolbarStyles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const CustomToolbar = withStyles(toolbarStyles)((props) => (
  <Toolbar {...props}>
    <SaveButton />
    <DeleteButtonWithConfirmation
      basePath={props.basePath}
      record={props.data}
      resource={props.resource}
      undoable={false}
    />{" "}
    />
  </Toolbar>
));

const AdminEdit = translate(({ classes, translate, ...props }) => {
  const [showDialog, toggleDialog] = useState(false);
  const [password, handleChangePassword] = useState("");
  const [confirmPassword, handleChangeConfirmPassword] = useState("");
  const [permissionGroupChoices, setPermissionGroupChoices] = useState([]);
  const [userKey, setUserKey] = useState(null);
  const { enqueueSnackbar } = props;
  useEffect(() => {
    handleChangePassword("");
    handleChangeConfirmPassword("");
  }, [showDialog]);
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    api.getPermissionGroups(ngoKey).then(({ data }) => {
      const choices = data.map((d) => ({
        id: d.id,
        name: d.name.replace(ngoKey + "_", ""),
      }));
      setPermissionGroupChoices(choices);
    });
  }, []);
  const resetPassword = () => {
    if (!password || password.length === 0) return;
    let passworddata = {
      password: password,
      confirmPassword: confirmPassword,
    };
    api
      .resetPasswordByAdmin(userKey, passworddata)
      .then((response) => {
        toggleDialog(!showDialog);
        api.handleSuccess(response, enqueueSnackbar);
      })
      .catch((response) => {
        api.handleError(response, enqueueSnackbar);
      });
  };
  const handlePermissionGroupChoiceChange = (data) => {
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
        title={translate("ra.edit admin")}
        actions={
          <AdminEditActions
            onToggleDialog={(userKey) => {
              toggleDialog(!showDialog);
              setUserKey(userKey);
            }}
            {...props}
          />
        }
        {...props}
      >
        <SimpleForm
          validate={validateAdminCreation}
          toolbar={<CustomToolbar />}
        >
          <TextInput
            autoFocus
            source="first_name"
            label={translate("ra.title.first_name")}
            formClassName={classes.first_name}
          />
          <TextInput
            source="middle_name"
            label={translate("ra.title.middle_name")}
            formClassName={classes.middle_name}
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
            type="email"
            source="email"
            label={translate("ra.title.email")}
            formClassName={classes.email}
          />
          <AutocompleteArrayInput
            source="permission_groups"
            label={translate("ra.title.permission_group")}
            choices={permissionGroupChoices}
            onChange={handlePermissionGroupChoiceChange}
          />
          <BooleanInput
            source="is_active"
            label={translate("ra.action.active")}
            formClassName={classes.email}
          />
        </SimpleForm>
      </Edit>
      <AdminResetPasswordDialog
        showDialog={showDialog}
        password={password}
        confirmPassword={confirmPassword}
        onChangePassword={handleChangePassword}
        onChangeConfirmPassword={handleChangeConfirmPassword}
        toggleDialog={() => {
          toggleDialog(!showDialog);
        }}
        resetPassword={resetPassword}
      />
    </div>
  );
});

export default withRouter(withSnackbar(withStyles(styles)(AdminEdit)));
