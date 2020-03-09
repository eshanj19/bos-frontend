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
import { Show, SimpleShowLayout, BooleanField, TextField } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { withTranslate } from "react-admin";
import { styles } from "../common/Styles";
import GenderField from "../common/GenderField";

const AdminShow = ({ classes, ...props }) => {
  const { translate } = props;
  return (
    <Show title={translate("ra.admin_information")} {...props}>
      <SimpleShowLayout classes={classes}>
        <TextField
          label={translate("ra.title.first_name")}
          source="first_name"
        />
        <TextField
          label={translate("ra.title.middle_name")}
          source="middle_name"
        />
        <TextField label={translate("ra.title.last_name")} source="last_name" />
        <GenderField
          label={translate("ra.title.gender")}
          source="gender"
          className={classes.gender}
        />
        <BooleanField
          source="is_active"
          label={translate("ra.action.active")}
        />
      </SimpleShowLayout>
    </Show>
  );
};

export default withTranslate(withStyles(styles)(AdminShow));
