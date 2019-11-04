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

import React, { useState } from "react";
import {
  Edit,
  TextInput,
  ShowButton,
  SimpleForm,
  BooleanInput,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card,
  CardContent, 
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CardActions,
  Input} from "@material-ui/core";
import api from "../api";

const styles = {
  inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
}

const AthleteEditActions = ({basePath,data,resource,onToggleDialog}) => {
  console.log(data)
  return(
    <CardActions style={{justifyContent:'flex-end'}}>
      <ShowButton basePath={basePath} record={data}/>
      {/* <Button color="primary" onClick={() => onToggleDialog(data.key)}>Reset Password</Button> */}
    </CardActions>
  )
}

const AthleteEdit = ({ classes, ...props }) => {
  const [showDialog, toggleDialog] = useState(false);
  const [password,handleChangePassword] = useState('');
  const [confirmPassword,handleChangeConfirmPassword] = useState('');
  const [userKey, setUserKey] = useState(null);
  const resetPassword = () => {
    console.log(password)
    console.log(confirmPassword)
    if(!password || password.length === 0) return;
    if(password === confirmPassword) {
      api.resetPassword(userKey,password).then(() => {
        toggleDialog(!showDialog);
      })
    }
  }
  return (
    <div>
    <Edit title="Athlete Edit" actions={
      <AthleteEditActions onToggleDialog={(userKey) => {toggleDialog(!showDialog);setUserKey(userKey)}} {...props}/>} 
      {...props}>
      <SimpleForm>
        <TextInput
          autoFocus
          source="first_name"
          formClassName={classes.inlineBlock}
        />
        <TextInput
          autoFocus
          source="last_name"
          formClassName={classes.inlineBlock}
        />
        <BooleanInput source="is_active" formClassName={[classes.is_active]} />
      </SimpleForm>
    </Edit>
    <Dialog fullWidth open={showDialog} onClose={() => toggleDialog(!showDialog)}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <div>
          <Input value={password} 
            type='password'
            onChange={({target}) => {handleChangePassword(target.value)}}
            style={{width:'250px'}} 
            placeholder="Enter new password"></Input>
        </div>
        <div style={{marginTop:'20px'}}>
          <Input 
            value={confirmPassword} 
            type='password'
            onChange={({target}) => {handleChangeConfirmPassword(target.value)}}
            style={{width:'250px'}} 
            placeholder="Confirm new password"></Input>
        </div>
        <div style={{marginTop:'25px'}}>
          <Button color='primary' variant='raised' onClick={resetPassword}>Reset</Button>
          <Button style={{marginLeft:'0.8rem'}} 
          color='primary' onClick={() => toggleDialog(!showDialog)}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  )
};

export default withStyles(styles)(AthleteEdit);
