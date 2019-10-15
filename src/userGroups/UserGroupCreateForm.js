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
import { TextField, Button, Grid } from "@material-ui/core";
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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4}>
          <TextField
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

      <FieldArray
        name="permissions"
        render={arrayhelpers => (
          <div>
            {allPermissions.map(permission => (
              <div key={permission.id}>
                <label>
                  <Field
                    name={permission.id}
                    component="input"
                    type="checkbox"
                    // checked={props.values.allPermissions}
                  />
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
        )}
      />

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
