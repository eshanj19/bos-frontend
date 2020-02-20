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

import React, { useEffect, useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./UserGroupCreate";
import {
  SingleFieldList,
  ArrayField,
  TextField,
  SimpleShowLayout,
  BooleanField,
  Show,
  ChipField
} from "react-admin";
import api from "../api";
import { translate } from "react-admin";

const UserGroupShow = translate(
  ({ classes, permissions, translate, ...props }) => {
    const [resourceChoices, setResourceChoices] = useState([]);
    const [userChoices, setUserChoices] = useState([]);
    useEffect(() => {
      //fetch possible resource choices.
      const ngoKey = localStorage.getItem("ngo_key");
      api.getResourcesByNgo(ngoKey).then(({ data }) => {
        console.log(data);
        const choices = data.map(d => ({ id: d.key, name: d.label }));
        setResourceChoices(choices);
      });
      api.getAllUsersByNgo(ngoKey).then(({ data }) => {
        const choices = data.map(d => ({
          id: d.key,
          name: `${d.first_name + d.last_name}`
        }));
        setUserChoices(choices);
      });
    }, []);

    return (
      <Show {...props}>
        <SimpleShowLayout redirect="list">
          <TextField
            autoFocus
            label={translate("ra.title.label")}
            source="label"
            formClassName={classes.label}
          />
          <ArrayField
            label={translate("ra.title.resources")}
            source="resources"
            choices={resourceChoices}
          >
            <SingleFieldList>
              <ChipField label={translate("ra.title.name")} source="name" />
            </SingleFieldList>
          </ArrayField>
          <BooleanField
            source="is_active"
            label={translate("ra.action.active")}
            formClassName={classes.is_active}
            defaultValue={true}
          />
        </SimpleShowLayout>
      </Show>
    );
  }
);

export default withStyles(styles)(UserGroupShow);
