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
import { translate } from "react-admin";

export const styles = {
  grid_element: { justifyContent: "left", display: "flex" }
};

const NgoCreateForm = translate(({ translate, ...props }) => {
  const {
    values: {
      name,
      first_name,
      last_name,
      username,
      email,
      password,
      confirm_password
    },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
    classes
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="name"
            name="name"
            style={{ width: 220 }}
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            label={translate("ra.title.name_of_ngo")}
            //label="ra.title.measurement"
            value={name}
            onChange={change.bind(null, "name")}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="first_name"
            name="first_name"
            style={{ width: 220 }}
            helperText={touched.first_name ? errors.first_name : ""}
            error={touched.first_name && Boolean(errors.first_name)}
            label={translate("ra.title.first_name_ngo_admin")}
            value={first_name}
            onChange={change.bind(null, "first_name")}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="last_name"
            name="last_name"
            style={{ width: 220 }}
            helperText={touched.last_name ? errors.last_name : ""}
            error={touched.last_name && Boolean(errors.last_name)}
            label={translate("ra.title.last_name_ngo_admin")}
            value={last_name}
            onChange={change.bind(null, "last_name")}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="username"
            name="username"
            style={{ width: 220 }}
            helperText={touched.username ? errors.username : ""}
            error={touched.username && Boolean(errors.username)}
            label={translate("ra.title.username_ngo_admin")}
            value={username}
            onChange={change.bind(null, "username")}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="email"
            name="email"
            style={{ width: 220 }}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            label={translate("ra.title.emailaddress_ngo_admin")}
            value={email}
            onChange={change.bind(null, "email")}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="password"
            name="password"
            style={{ width: 220 }}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            label={translate("ra.title.password")}
            type="password"
            value={password}
            onChange={change.bind(null, "password")}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.grid_element}>
          <TextField
            id="confirm_password"
            name="confirm_password"
            style={{ width: 220 }}
            helperText={touched.confirm_password ? errors.confirm_password : ""}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            label={translate("ra.title.confirm_password")}
            type="password"
            value={confirm_password}
            onChange={change.bind(null, "confirm_password")}
          />
        </Grid>
      </Grid>
      <br></br>
      <br></br>
      <Grid
        container
        spacing={8}
        direction="row"
        justify="left"
        alignItems="center"
      >
        <Button
          type="submit"
          variant="raised"
          color="primary"
          disabled={!isValid}
        >
          {translate("ra.action.submit")}
        </Button>
      </Grid>
    </form>
  );
});

export default withStyles(styles)(NgoCreateForm);
