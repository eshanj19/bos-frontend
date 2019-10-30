import React, { Component } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Card, CardContent, Menu, MenuItem, Button } from "@material-ui/core";
import { flat_hierarchy } from "../utils";

class OrgChartNode extends Component {
  state = { menuAnchorEl: null };
  render() {
    const { node,flatttenedHierarchyStructure } = this.props;
    console.log({flatttenedHierarchyStructure})
    return (
      <div>
        <div
          className="org-chart-node"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="org-chart-node-body">
            {node.label}
            <div>
              <PersonAddIcon
                onClick={event => {
                  this.setState({ menuAnchorEl: event.currentTarget });
                }}
              />
              <Menu
                id="simple-menu"
                anchorEl={this.state.menuAnchorEl}
                keepMounted
                open={Boolean(this.state.menuAnchorEl)}
                onClose={() => {
                  this.setState({ menuAnchorEl: null });
                }}
              >
                {flatttenedHierarchyStructure.map(option => {
                  return (
                    <MenuItem
                      onClick={() => {
                        this.props.setParentNode(node.key, option.key);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  );
                })}
                <MenuItem
                  onClick={() => {
                    this.props.setParentNode(node.key, null);
                  }}
                >
                  --Empty--
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrgChartNode;
