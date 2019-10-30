import React, { Component, Fragment } from "react";
import {
  Card,
  CardContent,
  Menu,
  MenuItem,
  Button,
  Grid
} from "@material-ui/core";
import renderOrgChartChildren from "./renderOrgChartChildren";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import head from "lodash/head";
import api from "../api";
import { flat_hierarchy } from "../utils";

/**
 * example user hierarchy stored in state --
 *
 * {
 *   label:"Rajesh",
 *   key : "12zxc",
 *   children : [
 *     {
 *       label : "Rahul",
 *       key : "2987zc",
 *       children : { ... }
 *     },
 *     { ... }
 *   ]
 * }
 */

class OrgnisationShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgHierarchy: null,
      zeroEdgeNodes: [],
      menuAnchorEl: null,
      flatttenedHierarchyStructure: [],
      selectedZeroEdgeNode : null
    };
  }

  componentDidMount() {
    const ngoKey = localStorage.getItem("ngo_key");
    api
      .getUserHierarchy(ngoKey)
      .then(response => {
        // TODO Error handling
        const hierarchyData = response.data;
        // const hierarchyData = flat_hierarchy;
        const flatttenedHierarchyStructure = hierarchyData;
        const { root, zeroEdgeNodes } = this.getHierarchy(hierarchyData);
        this.setState({
          orgHierarchy: root,
          zeroEdgeNodes,
          flatttenedHierarchyStructure
        });
      })
      .catch(response => {
        console.log(response);
        api.handleError(response);
      });
  }
  findNodeByKey = (node, key) => {
    if (!node) return null;
    if (node.key === key) return node;
    const i = findIndex(node.children, { key: key });
    if (i > -1) return node.children[i];
    if (node.children) {
      for (let k = 0; k < node.children.length; k++) {
        const found = this.findNodeByKey(node.children[k], key);
        if (found) return found;
      }
    } else {
      return null;
    }
  };

  getHierarchy = hierarchyData => {
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
      if (!parent_node && children.length === 0) {
        zeroEdgeNodes.push(node);
        return;
      }
      if (!parent_node) {
        topLevelNodes.push(node);
        return;
      }
    });
    if (topLevelNodes.length > 1) {
      root = {
        label: "Ghost Node",
        key: "ghost_node",
        children: topLevelNodes
      };
    } else {
      root = head(topLevelNodes) || null;
    }
    return { root, zeroEdgeNodes };
  };

  setParentForNode = (nodeKey, parentKey) => {
    let { orgHierarchy, zeroEdgeNodes } = this.state;
    const node =
      this.findNodeByKey(orgHierarchy, nodeKey) ||
      find(zeroEdgeNodes, { key: nodeKey });
    const newParentNode = this.findNodeByKey(orgHierarchy, parentKey);

    /**
     * if users sets parent to NULL,
     * it becomes a child of the ghost-node
     */
    if (!parentKey) {
      /**
       * if there is no hierarchy to start with, make a ghost node and
       * set that as top-level parent.
       */
      if (!orgHierarchy) {
        orgHierarchy = {
          label: "Ghost Node",
          key: "ghost_node",
          children: []
        };
      }
      orgHierarchy.children.push(node);
      /**
       * if the node is from zero-edge node,
       * handle relevant changes to the data.
       */
      if (findIndex(zeroEdgeNodes, { key: nodeKey }) > -1) {
        zeroEdgeNodes.splice(findIndex(zeroEdgeNodes, { key: nodeKey }), 1);
      }
      this.setState({ orgHierarchy, zeroEdgeNodes });
      return;
    }
    /**
     * check for cyclic tree
     * following check must pass --
     * 1. has no children
     * 2. new parent is not a decendent of the node in current hierarchy.
     */
    if (this.isDecendentByKeyIn(newParentNode.key, node)) {
      console.log("is decendent!");
    }

    const { parent_node: oldParentNodeKey } = node;
    /**
     * if node already had a parent,
     * remove the node from parent's children array.
     */
    if (oldParentNodeKey) {
      const oldParentNode = this.findNodeByKey(orgHierarchy, oldParentNodeKey);
      const i = findIndex(oldParentNode.children, { key: node.key });
      oldParentNode.children.splice(i, 1);
    } else {
      /**
       * if there was no parent earlier, it must have been in the ZeroEdgeNodes array.
       * remove from there as well.
       */
      zeroEdgeNodes.splice(findIndex(zeroEdgeNodes, { key: nodeKey }), 1);
    }

    //insert node in the children array of new parent
    newParentNode.children.push(node);
    this.setState({ orgHierarchy });
  };

  isDecendentByKeyIn = (nodeKey, node) => {
    const found = this.findNodeByKey(nodeKey, node);
    return !!found;
  };

  handleSubmit = () => {
    const { orgHierarchy, zeroEdgeNodes } = this.state;
    const payload = [orgHierarchy].concat(zeroEdgeNodes);
    const ngoKey = localStorage.getItem("ngo_key");
    console.log(payload);
    // return;
    api.submitOrgHierarchy(payload, ngoKey).then(response => {});
  };

  render() {
    const {
      orgHierarchy,
      zeroEdgeNodes,
      flatttenedHierarchyStructure
    } = this.state;
    console.log({ orgHierarchy, flatttenedHierarchyStructure });
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h3>View/Edit Organisation</h3>
          </div>
          <div>
            <Button onClick={this.handleSave} contained="true" color="primary">
              Save
            </Button>
            <Button onClick={() => this.handleSubmit(true)} color="primary">
              Submit
            </Button>
          </div>
        </div>
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
              {orgHierarchy
                ? renderOrgChartChildren(
                    orgHierarchy,
                    this.setParentForNode,
                    flatttenedHierarchyStructure
                    // { label: "amogh _o" }
                  )
                : null}
            </div>
            <div>
              <div>
                <h5>Members with no athlete/coach relationship.</h5>
                {zeroEdgeNodes.length > 0
                  ? this.renderZeroEdgeNodes()
                  : "-- No members --"}
                {this.renderMenuItems()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  renderZeroEdgeNodes = () => {
    const {
      orgHierarchy,
      zeroEdgeNodes,
    } = this.state;
    return zeroEdgeNodes.map(item => {
      return (
        <Fragment key={item.key}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              {item.label}
            </Grid>
            <Grid item xs={2}>
              <Button
                color="primary"
                variant="flat"
                onClick={event => {
                  this.setState({ menuAnchorEl: event.currentTarget, selectedZeroEdgeNode : item });
                }}
              >
                <PersonAddIcon />{" "}
                <span style={{ marginLeft: "5px" }}>Set Parent</span>
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      );
    });
  };

  renderMenuItems = () => {
    const {
      flatttenedHierarchyStructure,
      selectedZeroEdgeNode
    } = this.state;
    return (
      <Menu
        id="simple-menu"
        anchorEl={this.state.menuAnchorEl}
        keepMounted
        open={Boolean(this.state.menuAnchorEl)}
        onClose={() => {
          this.setState({ menuAnchorEl: null });
        }}
      >
        {flatttenedHierarchyStructure.map(node => {
          return (
            <MenuItem
              key={node.key}
              onClick={() => {
                this.setParentForNode(selectedZeroEdgeNode.key, node.key);
                this.setState({ menuAnchorEl: null });
              }}
            >
              {node.label}
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={() => {
            this.setParentForNode(selectedZeroEdgeNode.key, null);
            this.setState({ menuAnchorEl: null });
          }}
        >
          --Empty--
        </MenuItem>
      </Menu>
    );
  };
}

export default OrgnisationShow;
