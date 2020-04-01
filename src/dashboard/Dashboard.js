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

import React, { Component, useEffect } from "react";
import { Responsive, withDataProvider } from "react-admin";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Welcome from "./Welcome";
import { translate, changeLocale } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { LOCAL_STORAGE_LOCALE, SUPERSET_API_URL } from "../constants";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginTop: "2em", marginBottom: "2em" }
};

const Dashboard = ({
  classes,
  theme,
  locale,
  changeTheme,
  changeLocale,
  translate
}) => {
  useEffect(() => {
    const locale = localStorage.getItem(LOCAL_STORAGE_LOCALE);
    console.log("Dashboard");
    console.log(locale);
    if (locale) {
      changeLocale(locale);
    }
  }, []);
  return (
    <Responsive
      medium={
        <div>
          <a href={SUPERSET_API_URL}>
            <Welcome />
          </a>
        </div>
      }
    />
  );
};

const mapStateToProps = state => ({
  version: state.admin.ui.viewVersion,
  locale: state.i18n.locale
});

const enhance = compose(
  connect(mapStateToProps, {
    changeLocale
  }),
  translate,
  withDataProvider,
  withStyles(styles)
);

export default enhance(Dashboard);
