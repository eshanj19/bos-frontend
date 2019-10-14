import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, CardContent, Button, Input } from "@material-ui/core";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import filterDeep from "deepdash/filterDeep";
import PlaceholderItem from "../create/PlaceholderItem";
import { RESOURCE_ITEMS, RESOURCE_TYPES, INPUT_TYPE } from "../../utils";
import api from "../../api";

export const styles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  is_active: { display: "inline-block" },
  resource_canvas: { height: "100%" },
  label_title: { fontSize: "1rem" },
  item_margin: { marginTop: "10px", marginBottom: "10px", marginLeft: "20px" }
};

const randomId = () => {
  return Math.floor(Math.random() * 1000);
};

const PLACEHOLDER_ID = 199;

const PLACEHOLDER_ITEMS = {
  id: PLACEHOLDER_ID
};

const PLACEHOLDER_SESSION = {
  id: PLACEHOLDER_ID
};

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        items: [PLACEHOLDER_ITEMS]
      }
    };
  }

  componentDidMount() {
    console.log(this.props);
    const ngoKey = localStorage.getItem("ngo_key");
    api.getFileDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      const sanitizedOptions = data.map(option => {
        return {
          label: option.label,
          value: option.key
        };
      });
      this.setState({ fileOptions: sanitizedOptions, filesData : data });
    });
    api.getMeasurementDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      const sanitizedOptions = data.map(option => {
        return {
          label: option.label,
          value: option.key
        };
      });
      this.setState({ measurementOptions: sanitizedOptions });
    });
  }

  handleAddSessionItemInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionItemLabel: value });
  };

  handleAddSessionItemClick = (sessionId, itemType) => {
    const { session, sessionItem } = this.state;
    const updatedSessionItems = session.items;
    const index = updatedSessionItems.length;
    updatedSessionItems.splice(index - 1, 1, {
      key: sessionItem.value,
      id: randomId(),
      type: itemType
    });
    updatedSessionItems.push(PLACEHOLDER_ITEMS);
    const updatedSession = {
      ...session,
      items: updatedSessionItems
    };
    this.setState({ session: updatedSession });
  };

  handleAddSessionInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionLabel: value });
  };

  handleAddMeasurementInputChange = (sessionId, selectedItem) => {
    console.log(selectedItem);
    this.setState(
      () => ({ sessionItem: selectedItem }),
      () => {
        this.handleAddSessionItemClick(sessionId, RESOURCE_ITEMS.MEASUREMENT);
      }
    );
  };

  handleAddFileInputChange = (sessionId, selectedItem) => {
    this.setState(
      () => ({ sessionItem: selectedItem }),
      () => {
        this.handleAddSessionItemClick(sessionId, RESOURCE_ITEMS.FILE);
      }
    );
  };

  renderSessionItems = (items, sessionId) => {
    const { measurementOptions, fileOptions } = this.state;
    return items.map((item, index) => {
      return item.id === PLACEHOLDER_ID ? (
        <div key={uniqueId()}>
          <PlaceholderItem
            inputType={INPUT_TYPE.DROPDOWN}
            onInputChange={selected =>
              this.handleAddMeasurementInputChange(sessionId, selected)
            }
            title="+ Add Measurement"
            inputPlaceholderText="Enter Item Title"
            style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}
            options={this.state.measurementOptions}
          />
          <PlaceholderItem
            inputType={INPUT_TYPE.DROPDOWN}
            onInputChange={selected =>
              this.handleAddFileInputChange(sessionId, selected)
            }
            title="+ Add File"
            inputPlaceholderText="Enter Item Title"
            style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}
            options={this.state.fileOptions}
          />
        </div>
      ) : (
        <div key={uniqueId()} className={this.props.classes.item_margin}>
          <span className={this.props.classes.label_title}>
            {
              find(measurementOptions.concat(fileOptions), {
                value: item.key
              }).label
            }
          </span>
        </div>
      );
    });
  };

  renderSessions = (session, index) => {
    return (
      <div key={index} style={{ marginBottom: "8px", overflow: "initial" }}>
        <span className={this.props.classes.label_title}>{session.label}</span>
        {this.renderSessionItems(session.items, session.id)}
      </div>
    );
  };

  handleSubmit = () => {
    const {
      session: { items },
      filesData,
      sessionName
    } = this.state;
    /**
     * filter the placeholders
     * don't need to have the placeholders to be
     * sent to the server
     */
    const files = items
      .filter(item => {
        return item.type === RESOURCE_ITEMS.FILE && item.id !== PLACEHOLDER_ID;
      })
      .map(item => {
        delete item.type;
        delete item.id;
        const selectedFile = find(filesData,{key:item.key});
        const {data,label,key} = selectedFile;
        return {
          data,label,key
        }
      });

    const measurements = items
      .filter(item => {
        return (
          item.type === RESOURCE_ITEMS.MEASUREMENT && item.id !== PLACEHOLDER_ID
        );
      })
      .map(item => {
        delete item.type;
        delete item.id;
        return item;
      });
    console.log({ files, measurements });
    const payload = {
      data: { files, measurements },
      label: sessionName,
      type: "session"
    };
    api.saveSession(payload).then(response => {
      console.log("session saved");
    });
    // console.log(filtered);
  };
  render() {
    const { classes, ...props } = this.props;
    const { session } = this.state;
    console.log({ state: this.state });
    return (
      <div className={classes.root}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h4>Create Session</h4>
          </div>
          <div>
            <Button contained="true" color="primary">
              Save
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </div>
        </div>
        <Card style={{ overflow: "initial" }}>
          <CardContent>
            <Input
              style={{ width: "200px", marginBottom: "24px" }}
              placeholder="Session Name"
              onChange={({target : {value}}) => {this.setState({sessionName:value})}}
            />
            {this.renderSessionItems(session.items, session.id)}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Session);
