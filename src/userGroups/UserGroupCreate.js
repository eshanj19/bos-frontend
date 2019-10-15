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

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, CardContent, Grid } from "@material-ui/core";
import {
  Create,
  SelectArrayInput,
  ReferenceArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput
} from "react-admin";

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

// class UserGroupCreate extends Component {
//   render() {
//     const { classes, ...props } = this.props;
//     return (
//       <div className={classes.root}>
//         <Grid container direction="row" justify="center" alignItems="center">
//           <Card className={classes.card}>
//             <CardContent></CardContent>
//           </Card>
//         </Grid>
//       </div>
//     );
//   }
// }

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

const UserGroupCreate = ({ classes, ...props }) => (
  <Create {...props}>
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
      <BooleanInput
        source="is_active"
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Create>
);
export default withStyles(styles)(UserGroupCreate);
