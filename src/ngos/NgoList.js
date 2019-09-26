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

  NgoFilter = props => (
    <Filter {...props}>
      <SearchInput label="Name" source="name" alwaysOn />
      <BooleanInput source="is_active" alwaysOn />
    </Filter>
  );

  PostBulkActions = props => (
    <BulkActions {...props}>
      <DeactivateAction
        {...props}
        label="Deactivate"
        customPath="deactivate"
        onSuccess={this.onSuccess}
      />
      <BulkDeleteAction />
    </BulkActions>
  );

  onSuccess = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, permissions, ...props } = this.props;

    return (
      <List
        {...props}
        filters={<this.NgoFilter />}
        sort={{ field: "name", order: "ASC" }}
        perPage={25}
        filterDefaultValues={{ is_active: true }}
        bulkActions={<this.PostBulkActions />}
      >
        <Responsive
          medium={
            <Datagrid>
              <TextField source="name" type="text" />
              <BooleanField source="is_active" type="text" />
              <DateField source="creation_time" showTime />
              <DateField source="last_modification_time" showTime />
              {hasAccess(permissions, "ngos.show") && <ShowButton />}
              {hasAccess(permissions, "ngos.edit") && <EditButton />}
            </Datagrid>
          }
        />
      </List>
    );
  }
}
export default withStyles(styles)(NgoList);
