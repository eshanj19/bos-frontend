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
import { Responsive, withDataProvider } from "react-admin";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Welcome from "./Welcome";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginTop: "2em", marginBottom: "2em" }
};

class Dashboard extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    // handle refresh
    if (this.props.version !== prevProps.version) {
    }
  }

  render() {
    const {} = this.state;
    return (
      <Responsive
        medium={
          <div>
            <Welcome />
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  version: state.admin.ui.viewVersion
});

export default compose(
  connect(mapStateToProps),
  withDataProvider
)(Dashboard);
