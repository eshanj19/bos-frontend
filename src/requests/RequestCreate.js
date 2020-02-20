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
import withStyles from "@material-ui/core/styles/withStyles";
import { Create, TextInput, SimpleForm, SelectInput } from "react-admin";
import { GENDER_CHOICES } from "../constants";
import { translate } from "react-admin";

export const styles = {
  grid_element: { marginLeft: 32, marginTop: 10, marginBottom: 10 },
  root: {
    margin: "0 auto",
    width: "100%",
    backgroundColor: "white"
  },
  sectionHeader: {
    width: "100%",
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20
  },
  section1: {
    width: "100%",
    marginLeft: 20,
    marginRight: 20
  },
  section2: {
    width: "100%",
    margin: 20
  },
  icon: {
    fontSize: 20
  }
};

const validateRequestCreation = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = ["Required"];
  } else if (!values.last_name) {
    errors.last_name = ["Required"];
  } else if (!values.gender) {
    errors.gender = ["Required"];
  }
  return errors;
};

const RequestCreate = translate(({ classes, translate, ...props }) => {
  return (
    <Create undoable={false} {...props} title={translate("ra.create request")}>
      <SimpleForm redirect="list" validate={validateRequestCreation}>
        <TextInput
          autoFocus
          source="first_name"
          label={translate("ra.title.first_name")}
          formClassName={classes.first_name}
        />
        <TextInput
          label={translate("ra.title.middle_name")}
          source="middle_name"
          formClassName={classes.generic}
        />
        <TextInput
          label={translate("ra.title.last_name")}
          source="last_name"
          formClassName={classes.last_name}
        />
        <SelectInput
          label={translate("ra.title.gender")}
          source="gender"
          choices={GENDER_CHOICES}
        />
      </SimpleForm>
    </Create>
  );
});

export default withStyles(styles)(RequestCreate);
