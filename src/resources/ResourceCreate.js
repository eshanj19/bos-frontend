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
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, CardContent, Grid } from "@material-ui/core";
import MeasurementCard from "./MeasurementCard";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import LabelCard from "./LabelCard";
import SessionCard from "./SessionCard";
import DayCard from "./DayCard";
import ResourceCanvas from "./ResourceCanvas";

export const styles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  is_active: { display: "inline-block" },
  resource_canvas: { height: "100%" }
};

class ResourceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  customAction() {}

  render() {
    const { classes, ...props } = this.props;

    return (
      <div className={classes.root}>
        <DndProvider backend={HTML5Backend}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <DayCard text="Day" />
                </Grid>

                <Grid xs={3}>
                  <SessionCard text="Session" />
                </Grid>
                <Grid xs={3}>
                  <MeasurementCard text="Measurement" />
                </Grid>
                <Grid xs={3}>
                  <LabelCard text="Label" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <br />
          <br />
          <Card className={classes.resource_canvas}>
            <CardContent className={classes.resource_canvas}>
              <Grid container className={classes.resource_canvas}>
                <ResourceCanvas />
              </Grid>
            </CardContent>
          </Card>
        </DndProvider>
      </div>
    );
  }
}

export default withStyles(styles)(ResourceCreate);
