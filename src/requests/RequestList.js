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
import React, { Fragment, Component } from "react";
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  DateField,
  ChipField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { Route } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import { hasAccess } from "ra-auth-acl";
import RequestShow from "./RequestShow";

const styles = {
  nb_commands: { color: "purple" }
};

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  customAction = () => {
    const { classes, permissions, ...props } = this.props;
    console.log("inside");
    this.setState(
      {
        flag: true
      },
      () => {}
    );
  };

  handleclose = () => {
    this.props.history.push("/requests");
  };

  render() {
    const { classes, permissions, ...props } = this.props;
    console.log("inside");
    console.log(props);

    return (
      <div>
        <Route path="/requests/:id">
          {({ match }) => {
            const isMatch = !!(
              match &&
              match.params &&
              match.params.id !== "create"
            );

            return (
              <Fragment>
                <List
                  {...props}
                  sort={{ field: "creation_time", order: "ASC" }}
                  perPage={25}
                  filterDefaultValues={{ is_active: true }}
                  exporter={false}
                >
                  <Responsive
                    medium={
                      <Datagrid rowClick="edit">
                        <DateField label="Date" source="creation_time" />
                        <TextField source="first_name" />
                        <TextField source="last_name" />
                        <ChipField source="status" />
                      </Datagrid>
                    }
                  />
                </List>

                <Drawer
                  variant="persistent"
                  open={isMatch}
                  anchor="right"
                  style={{ zindex: 100 }}
                >
                  {isMatch ? (
                    <RequestShow
                      id={match.params.id}
                      {...props}
                      onCancel={this.handleclose}
                    />
                  ) : null}
                </Drawer>
              </Fragment>
            );
          }}
        </Route>
      </div>
    );
  }
}
export default withStyles(styles)(RequestList);
