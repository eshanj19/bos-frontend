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
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  ShowButton,
  Filter,
  List,
  TextField,
  BooleanInput,
  Responsive,
  SearchInput,
  BulkActions,
  BulkDeleteAction
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";
import DeactivateAction from "../common/DeactivateAction";
import { translate } from "react-admin";
import { withTranslate } from "react-admin";
import { race } from "redux-saga/effects";
import { PERMISSION_NGO_EDIT, PERMISSION_NGO_SHOW } from "../constants";

const styles = {
  nb_commands: { color: "purple" }
};

class NgoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athleteBaselineMeasurements: []
    };
    console.log(this.props);
    this.NgoFilter = this.NgoFilter.bind(this);
    this.PostBulkActions = this.PostBulkActions.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  NgoFilter = translate(({ translate, ...props }) => (
    <Filter {...props}>
      <SearchInput label={translate("ra.title.name")} source="name" alwaysOn />
      <BooleanInput
        label={translate("ra.title.is_active")}
        source="is_active"
        alwaysOn
      />
    </Filter>
  ));

  PostBulkActions = translate(({ translate, ...props }) => (
    <BulkActions {...props}>
      <DeactivateAction
        {...props}
        label={translate("ra.action.dectivate")}
        customPath="deactivate"
        onSuccess={this.onSuccess}
      />
      <BulkDeleteAction />
    </BulkActions>
  ));

  onSuccess = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, permissions, translate, ...props } = this.props;

    return (
      <List
        {...props}
        title={translate("ra.menu.ngos")}
        filters={<this.NgoFilter />}
        sort={{ field: "name", order: "ASC" }}
        perPage={25}
        filterDefaultValues={{ is_active: true }}
        bulkActions={<this.PostBulkActions />}
        exporter={false}
      >
        <Responsive
          medium={
            <Datagrid>
              <TextField
                label={translate("ra.title.name")}
                source="name"
                type="text"
              />
              <BooleanField
                label={translate("ra.title.is_active")}
                source="is_active"
                type="text"
              />
              <DateField
                label={translate("ra.title.created_on")}
                source="creation_time"
                showTime
              />

              <DateField
                label={translate("ra.title.last_mod")}
                source="last_modification_time"
                showTime
              />
              {/* {hasAccess(permissions, PERMISSION_NGO_SHOW) && <ShowButton />} */}
              {hasAccess(permissions, PERMISSION_NGO_EDIT) && <EditButton />}
            </Datagrid>
          }
        />
      </List>
    );
  }
}
export default withTranslate(withStyles(styles)(NgoList));
