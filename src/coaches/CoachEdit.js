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
import { GENDER_CHOICES, LOCAL_STORAGE_NGO_KEY } from "../constants";
import { translate } from "react-admin";
import DeleteButtonWithConfirmation from "../common/DeleteButtonWithConfirmation";
import AdminResetPasswordDialog from "../common/AdminResetPasswordDialog";
import { withSnackbar } from "notistack";

const styles = {
  flex: { display: "flex", marginRight: "1rem" },
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

const CoachEdit = translate(({ classes, translate, ...props }) => {
  const [showDialog, toggleDialog] = useState(false);
  const [password, handleChangePassword] = useState("");
  const [confirmPassword, handleChangeConfirmPassword] = useState("");
  const [userKey, setUserKey] = useState(null);
  const [resourceChoices, setResourceChoices] = useState([]);
  const [permissionGroupChoices, setPermissionGroupChoices] = useState([]);
  const { enqueueSnackbar } = props;
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    api.getResourcesByNgo(ngoKey).then(({ data }) => {
      const choices = data.map((d) => ({ id: d.key, name: d.label }));
      setResourceChoices(choices);
    });
  }, []);
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

  const resetPassword = () => {
    let passworddata = {
      password: password,
      confirmPassword: confirmPassword,
    };
    api
      .resetPasswordByAdmin(userKey, passworddata)
      .then((response) => {
        toggleDialog(!showDialog);
        console.log(response);
        api.handleSuccess(response, enqueueSnackbar);
      })
      .catch((response) => {
        api.handleError(response, enqueueSnackbar);
      });
  };

  const handleResourceChoiceChange = (data) => {
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
            onToggleDialog={(userKey) => {
              toggleDialog(!showDialog);
              setUserKey(userKey);
            }}
            {...props}
          />
        }
        {...props}
      >
        <SimpleForm toolbar={<CustomToolbar />}>
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

export default withSnackbar(withStyles(styles)(CoachEdit));
