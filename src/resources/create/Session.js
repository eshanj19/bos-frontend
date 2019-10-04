import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, CardContent, Button } from "@material-ui/core";
import findIndex from "lodash/findIndex";
import filterDeep from "deepdash/filterDeep";
import PlaceholderItem from "./PlaceholderItem";
import { RESOURCE_ITEMS } from "../../utils";
import api from "../../api";

export const styles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  is_active: { display: "inline-block" },
  resource_canvas: { height: "100%" },
  label_title: { fontSize: "1rem" }
};

const randomId = () => {
  return Math.floor(Math.random() * 1000);
}

const PLACEHOLDER_ID = 199;

const PLACEHOLDER_DAY = {
  id: PLACEHOLDER_ID
};

const PLACEHOLDER_ITEMS = {
  id: PLACEHOLDER_ID
};

const PLACEHOLDER_SESSION = {
  id: PLACEHOLDER_ID,
};

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [PLACEHOLDER_SESSION]
    };
  }

  handleAddSessionClick = () => {
    const { sessions, sessionLabel } = this.state;
    const updatedSessions = Array.from(sessions);
    const index = updatedSessions.length;
    // updatedDays.splice(index - 1,1);
    updatedSessions.splice(index - 1, 1, {
      label: sessionLabel,
      id: randomId(),
      items: [PLACEHOLDER_ITEMS]
    });
    updatedSessions.push(PLACEHOLDER_SESSION);
    // updatedDays.push();
    this.setState({ sessions: updatedSessions });
  };

  handleAddSessionItemInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionItemLabel: value });
  };

  handleAddSessionItemClick = sessionId => {
    const { sessions, sessionItemLabel } = this.state;
    const updatedSessions = Array.from(sessions);
    const sessionIndex = findIndex(sessions, { id: sessionId });
    const updatedSessionItems = sessions[sessionIndex].items;
    const index = updatedSessionItems.length;
    updatedSessionItems.splice(index - 1, 1, {
      label: sessionItemLabel,
      id: randomId()
    });
    updatedSessionItems.push(PLACEHOLDER_ITEMS);
    const updatedSession = { ...sessions[sessionIndex], items: updatedSessionItems };
    updatedSessions.splice(sessionIndex, 1, updatedSession);
    this.setState({ sessions: updatedSessions });
  };

  handleAddSessionInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionLabel: value });
  };


  renderSessionItems = (items, sessionId) => {
    return items.map((item, index) => {
      return item.id === PLACEHOLDER_ID ? (
        <PlaceholderItem
          key={index}
          onAddClick={() => {
            this.handleAddSessionItemClick(sessionId);
          }}
          onInputChange={this.handleSessionItemInputChange}
          title="+ Add Item"
          inputPlaceholderText="Enter Item Title"
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        />
      ) : (
        <div key={index} style={{ marginLeft: "20px" }}>
          <span className={this.props.classes.label_title}>
            {`ITEM Title`}
          </span>
        </div>
      );
    });
  };

  renderSessions = (session, index) => {
    return (
      <Card key={index} style={{ marginBottom: "8px" }}>
        <CardContent>
          <span className={this.props.classes.label_title}>{session.label}</span>
          {this.renderSessionItems(session.items, session.id)}
        </CardContent>
      </Card>
    );
  };

  handleSubmit = () => {
    const { days } = this.state;
    const filtered = filterDeep(days, (value, key, parent) => {
      console.log(key);
      console.log(value);
      if (key == "id" && value === PLACEHOLDER_ID) {
        return false;
      } else {
        return true;
      }
    });
    console.log(filtered);
  };
  render() {
    const { classes, ...props } = this.props;
    const { sessions } = this.state;
    // console.log({state : this.state})
    return (
      <div className={classes.root}>
        {sessions.map((session, index) => {
          return session.id === PLACEHOLDER_ID ? (
            <PlaceholderItem
              key={index}
              type={RESOURCE_ITEMS.SESSION}
              onInputChange={this.handleAddSessionInputChange}
              onAddClick={this.handleAddSessionClick}
              title="+ Add Session"
              inputPlaceholderText="Enter Session Title"
            />
          ) : (
            this.renderSessions(session, index)
          );
        })}
        <Button contained="true" color="primary">
          Save
        </Button>
        <Button onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Session);
