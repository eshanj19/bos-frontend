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
import { AppBar, UserMenu, MenuItemLink, translate } from "react-admin";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  spacer: {
    flex: 1
  }
};

const CustomUserMenu = translate(({ translate, ...props }) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/configuration"
      primaryText={translate("ra.configuration")}
      leftIcon={<SettingsIcon />}
    />
  </UserMenu>
));

const CustomAppBar = ({ classes, ...props }) => (
  <AppBar {...props} userMenu={<CustomUserMenu />}>
    <Typography
      variant="title"
      color="inherit"
      className={classes.title}
      id="react-admin-title"
    />
    Bridges of Sports
    <span className={classes.spacer} />
  </AppBar>
);

export default withStyles(styles)(CustomAppBar);
