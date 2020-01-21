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

import React from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  GridList
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import PermissionGroupList from "../common/PermissionGroupList";
import { FieldArray, Field } from "formik";

export const styles = {
  name: { display: "inline-block" },
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block" },
  address: { display: "inline-block" },
  username: { display: "inline-block" },
  email: { display: "inline-block" },
  password: { display: "inline-block" },
  confirm_password: { display: "inline-block" }
};

const PermissionGroupCreateForm = props => {
  const {
    values: { name },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
    classes,
    allPermissions
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const getPermission = () => {
    const clubpermissions = [
      { key: "_group", name: "Group" },
      { key: "_curriculum", name: "Curriculum" },
      { key: "_ngoregistrationresource", name: "Ngo Registration" },
      { key: "_userhierarchy", name: "User Hierarchy" },
      { key: "_usergroup", name: "User Group" },
      { key: "_athlete", name: "Athlete" },
      { key: "_ngo", name: "Ngo" },
      { key: "_resource", name: "Resources" },
      { key: "_trainingsession", name: "Training session" },
      { key: "_userresource", name: "User Resources" },
      { key: "_coach", name: "Coach" },
      { key: "_userreading", name: "User Reading" },
      { key: "_user", name: "User" },
      { key: "_file", name: "File" },
      { key: "_admin", name: "Admin" },
      { key: "_measurement", name: "Measurements" }
    ];

    let allPermissionsCopy = [...allPermissions];

    const mapped = clubpermissions.map(clubpermission => {
      const list = allPermissionsCopy.filter(function(xyz) {
        return xyz.codename.includes(clubpermission.key);
      });
      for (let j = 0; j < list.length; j++) {
        for (let i = 0; i < allPermissionsCopy.length; i++) {
          if (list[j].codename === allPermissionsCopy[i].codename) {
            allPermissionsCopy.splice(i, 1);
            break;
          }
        }
      }
      return (
        <FieldArray
          name="permissions"
          render={arrayhelpers => (
            <Grid item display="block" sm={4} xs={12} md={4}>
              <Card style={{ marginTop: 10, marginLeft: 8, paddingTop: 10 }}>
                <CardContent>
                  <h3>{clubpermission.name}</h3>
                  {list.map(permission => (
                    <div key={permission.id}>
                      <label>
                        <Field
                          name={permission.id}
                          component="input"
                          type="checkbox"
                        />
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}
        />
      );
    });

    return mapped;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item sm={6} xs={12} md={5}>
          <TextField
            style={{ marginLeft: 10 }}
            id="name"
            name="name"
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            label="Name of Permission Group"
            value={name}
            onChange={change.bind(null, "name")}
          />
        </Grid>
      </Grid>

      <div>
        <Grid container>{getPermission()}</Grid>
      </div>

      <Grid
        container
        spacing={8}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          type="submit"
          variant="raised"
          color="primary"
          disabled={!isValid}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(PermissionGroupCreateForm);
