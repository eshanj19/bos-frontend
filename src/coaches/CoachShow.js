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
import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  SelectField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { withTranslate } from "react-admin";
import { styles } from "../common/UserCreate";
import { GENDER_CHOICES } from "../constants";

class CoachShow extends Component {
  render() {
    const { classes, translate, ...props } = this.props;
    return (
      <Show title={translate("ra.coach_information")} {...props}>
        <SimpleShowLayout>
          <TextField
            label={translate("ra.title.first_name")}
            source="first_name"
            formClassName={classes.first_name}
          />
          <TextField
            label={translate("ra.title.middle_name")}
            source="middle_name"
            formClassName={classes.last_name}
          />
          <TextField
            label={translate("ra.title.last_name")}
            source="last_name"
            formClassName={classes.last_name}
          />
          <SelectField
            label={translate("ra.title.gender")}
            source="gender"
            choices={GENDER_CHOICES}
          />
          <TextField
            label={translate("ra.title.username")}
            source="username"
            formClassName={classes.first_name}
          />
          <BooleanField
            source="is_active"
            label={translate("ra.action.active")}
            formClassName={classes.is_active}
          />
        </SimpleShowLayout>
      </Show>
    );
  }
}

export default withTranslate(withStyles(styles)(CoachShow));
