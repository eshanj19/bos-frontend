import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import renderOrgChartChildren from "./renderOrgChartChildren";
import find from "lodash/find";
import head from "lodash/head";
import api from "../api";

const flat_hierarchy = [
  {
    key: "a1",
    label: "root",
    parent_node: null,
    children: [{ key: "a2" }, { key: "a3" }]
  },
  {
    key: "a2",
    label: "1st",
    parent_node: "a1",
    children: [{ key: "a21" }, { key: "a22" }]
  },
  {
    key: "a3",
    label: "2nd",
    parent_node: "a1",
    children: []
  },
  {
    key: "a21",
    label: "1-1st",
    parent_node: "a2",
    children: []
  },
  {
    key: "a22",
    label: "2-1st",
    parent_node: "a2",
    children: []
  },
  {
    key: "a1-sib",
    label: "2-1st",
    parent_node: null,
    children: [{ key: "a99" }]
  },
  {
    key: "a99",
    label: "2-99",
    parent_node: "a1-sib",
    children: []
  },
  {
    key: "a101",
    label: "2-101",
    parent_node: null,
    children: []
  }
];

class OrgnisationShow extends Component {
  constructor(props) {
    super(props);
    this.state = { userHierarchy: null,zeroEdgeNodes:[] };
  }

  componentDidMount() {
    const ngoKey = localStorage.getItem("ngo_key");
    api
      .getUserHierarchy(ngoKey)
      .then(response => {
        // TODO Error handling
        const hierarchyData = response.data;
        const {root, zeroEdgeNodes} = this.getHierarchy(hierarchyData);
        this.setState({
          userHierarchy : root,
          zeroEdgeNodes
        });
      })
      .catch(response => {
        console.log(response);
        api.handleError(response);
      });
  }
  getHierarchy = (hierarchyData) => {
    let root = {};
    const topLevelNodes = [];
    const zeroEdgeNodes = [];

    hierarchyData.forEach((node, index, array) => {
      const { children } = node;
      if (children) {
        node.children = children.map(child => {
          return find(hierarchyData, { key: child.key });
        });
      }
    });
    hierarchyData.forEach(node => {
      const { parent_node, children } = node;
      if(!parent_node && children.length === 0) {
        zeroEdgeNodes.push(node);
        return;
      }         
      if (!parent_node) {
        topLevelNodes.push(node);
        return;
      }
    });
    if (topLevelNodes.length > 1) {
      root = { label: "ghost_node", children: topLevelNodes };
    } else {
      root = head(topLevelNodes) || null;
    }
    return { root, zeroEdgeNodes };
  };
  render() {
    const {userHierarchy,zeroEdgeNodes} = this.state;
    return (
      <Card>
        <CardContent>
          <div
            className="reactOrgChart"
            style={{
              width: "90%",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {userHierarchy ? renderOrgChartChildren(
              userHierarchy
              // { label: "amogh _o" }
            ) : null}
          </div>
          <div>
            {zeroEdgeNodes.map(item => {
              return <div>{item.label}</div>;
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default OrgnisationShow;
