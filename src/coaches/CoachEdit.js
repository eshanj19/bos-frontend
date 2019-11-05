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

import React, { useState,useEffect } from "react";
import {
  Edit,
  TextInput,
  ShowButton,
  SimpleForm,
  BooleanInput,
  AutocompleteArrayInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Button,
  CardActions,
} from "@material-ui/core";
import api from "../api";
import ResetPasswordDialog from "../common/ResetPasswordDialog";

const styles = {
  inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
}


const CoachEditActions = ({ basePath, data, resource, onToggleDialog }) => {
  console.log(data);
  return (
    <CardActions style={{ justifyContent: "flex-end" }}>
      <ShowButton basePath={basePath} record={data} />
      <Button color="primary" onClick={() => onToggleDialog(data.key)}>Reset Password</Button>
    </CardActions>
  );
};

const CoachEdit = ({ classes, ...props }) => {
  const [showDialog, toggleDialog] = useState(false);
  const [password, handleChangePassword] = useState("");
  const [confirmPassword, handleChangeConfirmPassword] = useState("");
  const [userKey, setUserKey] = useState(null);
  const [resourceChoices, setResourceChoices] = useState([]);

  useEffect(() => {
    //fetch possible resource choices.
  },[]);
  useEffect(() => {
    handleChangePassword('');
    handleChangeConfirmPassword('');
  },[showDialog]);

  const resetPassword = () => {
    if (!password || password.length === 0) return;
    if (password === confirmPassword) {
      api.resetPassword(userKey, password).then(() => {
        toggleDialog(!showDialog);
      });
    }
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
        title="Coach Edit"
        actions={<CoachEditActions onToggleDialog={(userKey) => {toggleDialog(!showDialog);setUserKey(userKey)}} {...props} />}
        {...props}
      >
        <SimpleForm>
          <TextInput
            autoFocus
            source="first_name"
            formClassName={classes.first_name}
          />
          <TextInput
            autoFocus
            source="last_name"
            formClassName={classes.last_name}
          />
          <AutocompleteArrayInput
            source="category"
            choices={resourceChoices}
            onChange={handleResourceChoiceChange}
          />
          <BooleanInput source="is_active" formClassName={classes.is_active} />
        </SimpleForm>
      </Edit>
      <ResetPasswordDialog
        showDialog={showDialog}
        password={password}
        confirmPassword={confirmPassword}
        onChangePassword={handleChangePassword}
        onChangeConfirmPassword={handleChangeConfirmPassword}
        toggleDialog={() => {toggleDialog(!showDialog)}}
        resetPassword={resetPassword}
      />
    </div>
  );
};

export default withStyles(styles)(CoachEdit);
