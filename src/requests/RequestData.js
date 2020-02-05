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
  Datagrid,
  EditButton,
  Responsive,
  ShowButton,
  ArrayField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TableRow,
  TableCell
} from "@material-ui/core";

class RequestData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData = () => {
    const { ...props } = this.props;
    const {
      controllerProps: { record },
      measurements
    } = this.props;

    const lists = [];

    if (record) {
      var {
        data: { measurements: requestMeasurements }
      } = record;

      if (!requestMeasurements) {
        requestMeasurements = [];
      }
      requestMeasurements.forEach(requestMeasurementItem => {
        measurements.forEach(measurementItem => {
          if (requestMeasurementItem.key == measurementItem.key) {
            let dict = {
              measurement: measurementItem.label,
              value: requestMeasurementItem.value
            };

            lists.push(dict);
          }
        });
      });
    }

    const mapped = lists.map(list => {
      return (
        <TableRow>
          <TableCell>{list.measurement}</TableCell>
          <TableCell>{list.value}</TableCell>
        </TableRow>
      );
    });

    return mapped;
  };

  render() {
    return <div>{this.getData()}</div>;
  }
}
export default RequestData;
