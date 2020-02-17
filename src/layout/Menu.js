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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import SettingsIcon from "@material-ui/icons/Settings";
import { withRouter } from "react-router-dom";
import {
  translate,
  DashboardMenuItem,
  MenuItemLink,
  Responsive,
  WithPermissions
} from "react-admin";

import SubMenu from "./SubMenu";
import admins from "../admins";
import coaches from "../coaches";
import requests from "../requests";
import athletes from "../athletes";
import userGroups from "../userGroups";
import organisation from "../organisation";
import measurements from "../measurements";
import resources from "../resources";
import measurementTypes from "../measurementTypes";
import ngos from "../ngos";
import readings from "../readings";
import permissionGroups from "../permissionGroups";
import { hasAccess } from "ra-auth-acl";

class Menu extends Component {
  state = {};

  static propTypes = {
    onMenuClick: PropTypes.func,
    logout: PropTypes.object
  };

  handleToggle = menu => {
    this.setState(state => ({ [menu]: !state[menu] }));
  };

  render() {
    const { onMenuClick, open, logout, translate } = this.props;
    return (
      <div style={{ width: "290px" }}>
        <DashboardMenuItem onClick={onMenuClick} />

        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "ngos.enabled")) {
              return (
                <SubMenu
                  handleToggle={() => this.handleToggle("bosCatalog")}
                  isOpen={this.state.bosCatalog}
                  sidebarIsOpen={open}
                  name="BOS Admin"
                  icon={<measurements.icon />}
                >
                  <MenuItemLink
                    to={`/ngos`}
                    primaryText={translate(`ra.menu.ngo`, {
                      smart_count: 2
                    })}
                    leftIcon={<ngos.icon />}
                    onClick={onMenuClick}
                  />
                </SubMenu>
              );
            } else {
              return <div></div>;
            }
          }}
        />

        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "users.enabled")) {
              return (
                <SubMenu
                  handleToggle={() => this.handleToggle("userCatalog")}
                  isOpen={this.state.userCatalog}
                  sidebarIsOpen={open}
                  name="Users"
                  icon={<admins.icon />}
                >
                  {hasAccess(permissions, "users.enabled") && (
                    <MenuItemLink
                      to={`/admins`}
                      primaryText={"Admins"}
                      leftIcon={<admins.icon />}
                      onClick={onMenuClick}
                    />
                  )}
                  {hasAccess(permissions, "users.enabled") && (
                    <MenuItemLink
                      to={`/coaches`}
                      primaryText={"Coaches"}
                      leftIcon={<coaches.icon />}
                      onClick={onMenuClick}
                    />
                  )}
                  {hasAccess(permissions, "users.enabled") && (
                    <MenuItemLink
                      to={`/athletes`}
                      primaryText={"Athletes"}
                      leftIcon={<athletes.icon />}
                      onClick={onMenuClick}
                    />
                  )}
                  {hasAccess(permissions, "users.enabled") && (
                    <MenuItemLink
                      to={`/user_groups`}
                      primaryText={"User Groups"}
                      leftIcon={<userGroups.icon />}
                      onClick={onMenuClick}
                    />
                  )}
                  {hasAccess(permissions, "users.enabled") && (
                    <MenuItemLink
                      to={`/organisation`}
                      primaryText={"Organisation"}
                      leftIcon={<organisation.icon />}
                      onClick={onMenuClick}
                    />
                  )}
                  {hasAccess(permissions, "users.enabled") && (
                    <MenuItemLink
                      to={`/requests`}
                      primaryText={"Requests"}
                      leftIcon={<resources.icon />}
                      onClick={onMenuClick}
                    />
                  )}
                </SubMenu>
              );
            } else {
              return <div></div>;
            }
          }}
        />

        {/* TODO permissions */}
        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "resources.enabled")) {
              return (
                <MenuItemLink
                  to={`/resources`}
                  primaryText={"Resources"}
                  leftIcon={<resources.icon />}
                  onClick={onMenuClick}
                />
              );
            } else {
              return <div></div>;
            }
          }}
        />

        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "measurements.enabled")) {
              return (
                <MenuItemLink
                  to={`/measurements`}
                  primaryText={translate(`ra.title.measurement`, {
                    smart_count: 2
                  })}
                  leftIcon={<measurements.icon />}
                  onClick={onMenuClick}
                />
              );
            } else {
              return <div></div>;
            }
          }}
        />

        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "readings.enabled")) {
              return (
                <MenuItemLink
                  to={`/readings`}
                  primaryText={translate(`ra.menu.reading`, {
                    smart_count: 2
                  })}
                  leftIcon={<readings.icon />}
                  onClick={onMenuClick}
                />
              );
            } else {
              return <div></div>;
            }
          }}
        />

        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "measurement_types.enabled")) {
              return (
                <MenuItemLink
                  to={`/measurement_types`}
                  primaryText={translate("ra.menu.measurement_type", {
                    smart_count: 2
                  })}
                  leftIcon={<measurementTypes.icon />}
                  onClick={onMenuClick}
                />
              );
            } else {
              return <div></div>;
            }
          }}
        />

        <WithPermissions
          render={({ permissions }) => {
            if (hasAccess(permissions, "permission_groups.enabled")) {
              return (
                <MenuItemLink
                  to={`/permission_groups`}
                  primaryText={translate(`ra.title.permission_group`, {
                    smart_count: 2
                  })}
                  leftIcon={<permissionGroups.icon />}
                  onClick={onMenuClick}
                />
              );
            } else {
              return <div></div>;
            }
          }}
        />

        <Responsive
          xsmall={
            <MenuItemLink
              to="/configuration"
              primaryText={translate("pos.configuration")}
              leftIcon={<SettingsIcon />}
              onClick={onMenuClick}
            />
          }
          medium={null}
        />
        <Responsive
          small={logout}
          medium={null} // Pass null to render nothing on larger devices
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.admin.ui.sidebarOpen,
  theme: state.theme,
  locale: state.i18n.locale
});

const enhance = compose(withRouter, connect(mapStateToProps, {}), translate);

export default enhance(Menu);
