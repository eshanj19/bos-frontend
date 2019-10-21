import React, { Component } from "react";
import sortBy from "lodash/sortBy";
import find from "lodash/find";

class OrgChartNode extends Component {
  render() {
    const { node } = this.props;
    return (
      <div>
        <div
          className="org-chart-node"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="org-chart-node-body">{node.label}</div>
        </div>
      </div>
    );
  }
}

export default OrgChartNode;
