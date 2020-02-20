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
import filter from "lodash/filter";
import head from "lodash/head";
import sortBy from "lodash/sortBy";
import api from "../api";
import { withSnackbar } from "notistack";
import UserSelectionMenu from "./UserSelectionMenu";
import { withTranslate } from "react-admin";

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

class OrganisationShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgHierarchy: null,
      zeroEdgeNodes: [],
      menuAnchorEl: null,
      searchedUserList: [],
      selectedZeroEdgeNode: null,
      searchTerm: ""
    };
  }

  componentDidMount() {
    const ngoKey = localStorage.getItem("ngo_key");
    api
      .getUserHierarchy(ngoKey)
      .then(response => {
        // TODO Error handling
        const hierarchyData = response.data;
        console.log(hierarchyData);
        // return;
        // const hierarchyData = flat_hierarchy;
        const flatttenedHierarchyStructure = sortBy(
          hierarchyData,
          o => o.label
        );
        const { root, zeroEdgeNodes } = this.getHierarchy(hierarchyData);
        const possibleUserOptions = filter(flatttenedHierarchyStructure, o => {
          return this.findNodeByKey(root, o.key) && o.key !== "ghost_node";
        });
        console.log(possibleUserOptions);
        this.setState({
          orgHierarchy: root,
          zeroEdgeNodes,
          possibleUserOptions,
          flatttenedHierarchyStructure,
          searchedUserList: possibleUserOptions
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
        node.children = children.map(childKey => {
          return find(hierarchyData, { key: childKey });
        });
      }
    });
    hierarchyData.forEach(node => {
      const { parent_node, children } = node;
      if (!parent_node && children.length === 0 && node.key !== "ghost_node") {
        zeroEdgeNodes.push(node);
        return;
      }
      if (!parent_node) {
        topLevelNodes.push(node);
        return;
      }
    });
    const ghostNode = find(topLevelNodes, { key: "ghost_node" });
    const topNodes = filter(topLevelNodes, node => node.key !== "ghost_node");
    root = { ...ghostNode, children: topNodes };
    return { root, zeroEdgeNodes };
  };

  setParentForNode = (nodeKey, parentKey) => {
    let {
      orgHierarchy,
      zeroEdgeNodes,
      flatttenedHierarchyStructure
    } = this.state;
    /**
     * check for cyclic tree
     * must prevent that from happening.
     */
    if (parentKey && this.isDecendentByKeyIn(nodeKey, parentKey)) {
      this.props.enqueueSnackbar("is decendent!", {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
      return;
    }
    const node =
      this.findNodeByKey(orgHierarchy, nodeKey) ||
      find(zeroEdgeNodes, { key: nodeKey });
    const newParentNode = this.findNodeByKey(orgHierarchy, parentKey);
    const { parent_node: oldParentNodeKey } = node;
    if (newParentNode && newParentNode.key === oldParentNodeKey) return;

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
          label: "Organisation",
          key: "ghost_node",
          children: []
        };
      }
      orgHierarchy.children.push(node);
    }
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
       * if there was no parent earlier, it can be remove zeroEdgeNodes array
       * remove from there as well.
       */
      if (findIndex(zeroEdgeNodes, { key: nodeKey }) > -1) {
        zeroEdgeNodes.splice(findIndex(zeroEdgeNodes, { key: nodeKey }), 1);
      } else {
        /**
         * else the earlier parent was a ghost node.
         */
        if (findIndex(orgHierarchy.children, { key: nodeKey }) > -1) {
          const i = findIndex(orgHierarchy.children, { key: nodeKey });
          orgHierarchy.children.splice(i, 1);
        }
      }
    }

    //set parent_node value to the node
    //insert node in the children array of new parent
    if (newParentNode)
      newParentNode.children.push({ ...node, parent_node: parentKey });
    const possibleUserOptions = filter(flatttenedHierarchyStructure, o => {
      return this.findNodeByKey(orgHierarchy, o.key) && o.key !== "ghost_node";
    });
    this.setState({
      orgHierarchy,
      zeroEdgeNodes,
      possibleUserOptions,
      searchedUserList: possibleUserOptions
    });
  };

  isDecendentByKeyIn = (selectedNodeKey, toBeParentKey) => {
    const { orgHierarchy } = this.state;
    /**
     * check whether toBeParent is children/grandchildren of selectedNode
     */
    const selectedNode = this.findNodeByKey(orgHierarchy, selectedNodeKey);
    const toBeParentNode = this.findNodeByKey(orgHierarchy, toBeParentKey);
    const found = this.findNodeByKey(selectedNode, toBeParentKey);
    return !!found;
  };

  handleSave = () => {
    const { orgHierarchy, zeroEdgeNodes } = this.state;
    const payload = [orgHierarchy].concat(zeroEdgeNodes);
    const ngoKey = localStorage.getItem("ngo_key");
    console.log(payload);
    // return;
    api
      .saveOrgHierarchy(payload, ngoKey)
      .then(response => {
        console.log(response);
        api.handleSuccess(response, this.props.enqueueSnackbar);
      })
      .catch(error => {
        api.handleError(error);
      });
  };

  render() {
    const { orgHierarchy, zeroEdgeNodes, searchedUserList } = this.state;
    const { translate } = this.props;
    console.log({ orgHierarchy });
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
            <h3>{translate("ra.title.view_edit_organisation")}</h3>
          </div>
          <div>
            <Button onClick={() => this.handleSave(true)} color="primary">
              {translate("ra.action.save")}
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>
            <div
              className="reactOrgChart"
              style={{
                marginTop: "20px",
                overflowX: "scroll"
              }}
            >
              {orgHierarchy
                ? renderOrgChartChildren(
                    orgHierarchy,
                    this.setParentForNode,
                    searchedUserList,
                    this.handleSearchUser,
                    this.state.searchTerm
                    // { label: "amogh _o" }
                  )
                : null}
            </div>
            <div>
              <div>
                <h5>
                  {translate("ra.Members with no athlete/coach relationship")}
                </h5>
                {zeroEdgeNodes.length > 0
                  ? this.renderZeroEdgeNodes()
                  : translate("ra.title.no_members")}
                {this.renderMenuItems()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  renderZeroEdgeNodes = () => {
    const { orgHierarchy, zeroEdgeNodes } = this.state;
    const { translate } = this.props;
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
                  this.setState({
                    menuAnchorEl: event.currentTarget,
                    selectedZeroEdgeNode: item
                  });
                }}
              >
                <PersonAddIcon />{" "}
                <span style={{ marginLeft: "5px" }}>
                  {translate("ra.title.set_parent")}
                </span>
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      );
    });
  };

  handleSearchUser = searchTerm => {
    const { searchedUserList, possibleUserOptions } = this.state;
    if (!searchTerm || searchTerm.length === 0) {
      this.resetSearchedTerm();
      return;
    }
    const filtered = filter(possibleUserOptions, o => {
      return o.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
    this.setState({ searchedUserList: filtered, searchTerm });
  };

  resetSearchedTerm = () => {
    const { searchedUserList, possibleUserOptions } = this.state;
    this.setState({ searchedUserList: possibleUserOptions, searchTerm: "" });
  };

  renderMenuItems = () => {
    const { searchedUserList, selectedZeroEdgeNode } = this.state;

    return (
      <UserSelectionMenu
        onUserSelected={userOption => {
          this.setParentForNode(
            selectedZeroEdgeNode.key,
            userOption ? userOption.key : null
          );
          this.setState({ menuAnchorEl: null });
        }}
        userOptions={searchedUserList}
        isOpen={Boolean(this.state.menuAnchorEl)}
        menuAnchorEl={this.state.menuAnchorEl}
        onClose={() => {
          this.resetSearchedTerm();
          this.setState({ menuAnchorEl: null });
        }}
        onSearchUser={this.handleSearchUser}
        searchTerm={this.state.searchTerm}
      />
    );
  };
}

export default withTranslate(withSnackbar(OrganisationShow));

/**
 * if the node is from zero-edge node,
 * remove the node from zeroEdgeNodes array
 */
// if (findIndex(zeroEdgeNodes, { key: nodeKey }) > -1) {
//   zeroEdgeNodes.splice(findIndex(zeroEdgeNodes, { key: nodeKey }), 1);
// }
/**
 * remove the node from existing parent
 */
// const { parent_node: oldParentNodeKey } = node;
// if(oldParentNodeKey) {
//   const oldParentNode = this.findNodeByKey(orgHierarchy, oldParentNodeKey);
//   const i = findIndex(oldParentNode.children, { key: node.key });
//   oldParentNode.children.splice(i, 1);
// }
// this.setState({ orgHierarchy, zeroEdgeNodes });
// return;
