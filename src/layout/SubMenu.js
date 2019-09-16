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

import React, { Fragment } from "react";
import compose from "recompose/compose";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import { withStyles } from "@material-ui/core/styles";

import { translate } from "react-admin";

const styles = {
  listItem: {
    paddingLeft: "1rem"
  },
  listItemText: {
    paddingLeft: 2,
    fontSize: "1rem"
  },
  sidebarIsOpen: {
    paddingLeft: 25,
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
  },
  sidebarIsClosed: {
    paddingLeft: 0,
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
  }
};

const SubMenu = ({
  handleToggle,
  sidebarIsOpen,
  isOpen,
  name,
  icon,
  classes,
  children,
  translate
}) => (
  <Fragment>
    <ListItem dense button onClick={handleToggle} className={classes.listItem}>
      <ListItemIcon>{isOpen ? <ExpandMore /> : icon}</ListItemIcon>
      <ListItemText
        inset
        primary={isOpen ? translate(name) : ""}
        secondary={isOpen ? "" : translate(name)}
        className={classes.listItemText}
      />
    </ListItem>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List
        dense
        component="div"
        disablePadding
        className={
          sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed
        }
      >
        {children}
      </List>
      <Divider />
    </Collapse>
  </Fragment>
);

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(SubMenu);
