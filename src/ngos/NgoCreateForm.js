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

const NgoCreateForm = props => {
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
        <Grid item xs={12} md={4}>
          <TextField
            id="name"
            name="name"
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            label="Name of NGO"
            value={name}
            onChange={change.bind(null, "name")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="first_name"
            name="first_name"
            helperText={touched.first_name ? errors.first_name : ""}
            error={touched.first_name && Boolean(errors.first_name)}
            label="First name of NGO Admin"
            value={first_name}
            onChange={change.bind(null, "first_name")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="last_name"
            name="last_name"
            helperText={touched.last_name ? errors.last_name : ""}
            error={touched.last_name && Boolean(errors.last_name)}
            label="Last name of NGO Admin"
            value={last_name}
            onChange={change.bind(null, "last_name")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="username"
            name="username"
            helperText={touched.username ? errors.username : ""}
            error={touched.username && Boolean(errors.username)}
            label="Username of NGO Admin"
            value={username}
            onChange={change.bind(null, "username")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="email"
            name="email"
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            label="Email address of NGO admin"
            value={email}
            onChange={change.bind(null, "email")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="password"
            name="password"
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            label="Password"
            type="password"
            value={password}
            onChange={change.bind(null, "password")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="confirm_password"
            name="confirm_password"
            helperText={touched.confirm_password ? errors.confirm_password : ""}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            label="Confirm Password"
            type="password"
            value={confirm_password}
            onChange={change.bind(null, "confirm_password")}
          />
        </Grid>
      </Grid>

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

export default withStyles(styles)(NgoCreateForm);