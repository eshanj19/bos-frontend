import React, { Component } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { ATHLETE, COACH } from "../constants";
import UserSelectionMenu from "./UserSelectionMenu";

const TRANSPERANCY = "3d"; //transperance 24%

class OrgChartNode extends Component {
  state = { menuAnchorEl: null };
  render() {
    const { node,searchedUserList } = this.props;
    const {role} = node;
    const borderColor = role === ATHLETE ? '#d35400' : role === COACH ? '#2980b9' : '#f39c12';
    const backgroundColor = borderColor + TRANSPERANCY;
    return (
      <div>
        <div
          className="org-chart-node"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="org-chart-node-body" style={{borderColor,backgroundColor}}>
            {node.label}
            <div>
              <PersonAddIcon
                onClick={event => {
                  this.setState({ menuAnchorEl: event.currentTarget });
                }}
              />
              <UserSelectionMenu 
                onUserSelected={(userOption) => {
                  this.props.setParentNode(node.key, userOption ? userOption.key : null);
                  this.setState({menuAnchorEl:null})}
                }
                userOptions={searchedUserList}
                isOpen={Boolean(this.state.menuAnchorEl)}
                menuAnchorEl={this.state.menuAnchorEl}
                onClose={() => {this.setState({menuAnchorEl:null})}}
                onSearchUser={this.props.onSearchUser}
                searchTerm={this.props.searchTerm}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrgChartNode;
