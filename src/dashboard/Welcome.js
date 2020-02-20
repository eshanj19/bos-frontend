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
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-admin";

const styles = {
  media: {
    height: "18em"
  }
};

const Welcome = ({ classes, translate }) => (
  <Card>
    <CardContent>
      <Typography variant="headline" component="h2">
        {translate("ra.Welcome to Bridges of Sports platform")}
      </Typography>
      {/* <Typography component="p">This page is under development</Typography> */}
    </CardContent>
  </Card>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(Welcome);
