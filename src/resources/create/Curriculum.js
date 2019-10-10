import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, CardContent, Button, Input } from "@material-ui/core";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import filterDeep from "deepdash/filterDeep";
import PlaceholderItem from "./PlaceholderItem";
import { RESOURCE_ITEMS, INPUT_TYPE } from "../../utils";
import api from "../../api";
import DeleteIcon from "@material-ui/icons/Clear";

export const styles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  is_active: { display: "inline-block" },
  resource_canvas: { height: "100%" },
  label_title: { fontSize: "1rem" },
  item_margin: { marginTop: "10px", marginBottom: "10px", marginLeft: "20px" },
  header_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  delete_icon: {
    fontSize: "14px",
    position: "absolute",
    marginLeft: "8px",
    marginTop: "4px"
  },
  delete_wrapper: { position: "relative", cursor: "pointer" }
};

const randomId = type => {
  return uniqueId(`${type}_`);
};

const PLACEHOLDER_ID = -999;
const PLACEHOLDER_ID_FILE = -998;
const PLACEHOLDER_ID_MEASUREMENT = -997;

const PLACEHOLDER_DAY = {
  id: PLACEHOLDER_ID
};

const PLACEHOLDER_MEASUREMENT = {
  id: PLACEHOLDER_ID_MEASUREMENT
};

const PLACEHOLDER_FILE = {
  id: PLACEHOLDER_ID_FILE
};

const PLACEHOLDER_SESSIONS = {
  id: PLACEHOLDER_ID,
  measurements: [],
  files: []
};

class Cirriculum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [PLACEHOLDER_DAY],
      fileOptions: [],
      measurementOptions: []
    };
  }
  componentDidMount() {
    const ngoKey = localStorage.getItem("ngo_key");
    api.getFileDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      const sanitizedOptions = data.map(option => {
        return {
          label: option.label,
          value: option.key
        };
      });
      this.setState({ fileOptions: sanitizedOptions });
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

  findAndDeleteNode = id => {
    const updatedDays = Array.from(this.state.days);
    console.log([...updatedDays]);
    if (findIndex(updatedDays, { id: id }) > -1) {
      const dIndex = findIndex(updatedDays, { id: id });
      updatedDays.splice(dIndex, 1);
      return updatedDays;
    } else {
      for (let i = 0; i < updatedDays.length; i++) {
        const { sessions } = updatedDays[i];
        if (findIndex(sessions, { id: id }) > -1) {
          const sIndex = findIndex(sessions, { id: id });
          sessions.splice(sIndex, 1);
          return updatedDays;
        } else {
          for (let j = 0; j < sessions.length; j++) {
            const { measurements } = sessions[j];
            if (findIndex(measurements, { id: id }) > -1) {
              const mIndex = findIndex(measurements, { id: id });
              measurements.splice(mIndex, 1);
              return updatedDays;
            }
          }
        }
      }
    }
    return updatedDays;
  };

  handleDelete = id => {
    console.log(id);
    const updatedDays = this.findAndDeleteNode(id);
    console.log(updatedDays);
    this.setState({ days: updatedDays });
  };

  handleAddDayClick = () => {
    const { days, dayLabel } = this.state;
    const updatedDays = Array.from(days);
    const index = updatedDays.length;
    // updatedDays.splice(index - 1,1);
    updatedDays.splice(index - 1, 1, {
      label: dayLabel,
      id: randomId("day"),
      sessions: [PLACEHOLDER_SESSIONS]
    });
    updatedDays.push(PLACEHOLDER_DAY);
    // updatedDays.push();
    this.setState({ days: updatedDays });
  };

  handleAddDayInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ dayLabel: value });
  };

  handleAddSessionClick = dayId => {
    const { days, sessionLabel } = this.state;
    const updatedDays = Array.from(days);
    const dayIndex = findIndex(days, { id: dayId });
    const updatedSessions = days[dayIndex].sessions;
    const index = updatedSessions.length;
    updatedSessions.splice(index - 1, 1, {
      label: sessionLabel,
      id: randomId("session"),
      measurements: [PLACEHOLDER_MEASUREMENT],
      files: [PLACEHOLDER_FILE]
    });
    updatedSessions.push(PLACEHOLDER_SESSIONS);
    const updatedDay = { ...days[dayIndex], sessions: updatedSessions };
    updatedDays.splice(dayIndex, 1, updatedDay);
    this.setState({ days: updatedDays });
  };

  handleAddMeasurementInputChange = (sessionId, dayId, { label, value }) => {
    // console.log(value);
    // const {name,value} = target;
    this.setState(
      () => ({ measurementLabel: value }),
      () => {
        this.handleAddMeasurementClick(sessionId, dayId);
      }
    );
  };

  handleAddFileInputChange = (sessionId, dayId, { label, value }) => {
    this.setState(
      () => ({ fileLabel: value }),
      () => {
        this.handleAddFileClick(sessionId, dayId);
      }
    );
  };

  handleAddFileClick = (sessionId, dayId) => {
    const { days, fileLabel } = this.state;
    const updatedDays = Array.from(days);
    const dayIndex = findIndex(days, { id: dayId });
    const sessionIndex = findIndex(days[dayIndex].sessions, { id: sessionId });
    const updatedSessions = days[dayIndex].sessions;
    const updatedFiles = days[dayIndex].sessions[sessionIndex].files;
    const index = updatedFiles.length;
    updatedFiles.splice(index - 1, 1, {
      label: fileLabel,
      id: randomId("file")
    });
    updatedFiles.push(PLACEHOLDER_FILE);
    //find index of day to be updated.
    const updatedSession = {
      ...days[dayIndex].sessions[sessionIndex],
      files: updatedFiles
    };
    updatedSessions.splice(sessionIndex, 1, updatedSession);
    const updatedDay = { ...days[dayIndex], sessions: updatedSessions };
    updatedDays.splice(dayIndex, 1, updatedDay);
    this.setState({ days: updatedDays });
  };

  handleAddSessionInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionLabel: value });
  };

  handleAddMeasurementClick = (sessionId, dayId) => {
    const { days, measurementLabel } = this.state;
    const updatedDays = Array.from(days);
    const dayIndex = findIndex(days, { id: dayId });
    const sessionIndex = findIndex(days[dayIndex].sessions, { id: sessionId });
    const updatedSessions = days[dayIndex].sessions;
    const updatedMeasurements =
      days[dayIndex].sessions[sessionIndex].measurements;
    const index = updatedMeasurements.length;
    updatedMeasurements.splice(index - 1, 1, {
      label: measurementLabel,
      id: randomId("measurement")
    });
    updatedMeasurements.push(PLACEHOLDER_MEASUREMENT);
    //find index of day to be updated.
    const updatedSession = {
      ...days[dayIndex].sessions[sessionIndex],
      measurements: updatedMeasurements
    };
    updatedSessions.splice(sessionIndex, 1, updatedSession);
    const updatedDay = { ...days[dayIndex], sessions: updatedSessions };
    updatedDays.splice(dayIndex, 1, updatedDay);
    this.setState({ days: updatedDays });
  };

  renderMeasurementAndFiles = (measurements, files, sessionId, dayId) => {
    return measurements.concat(files).map((item, index) => {
      return item.id === PLACEHOLDER_ID_MEASUREMENT ? (
        <PlaceholderItem
          key={index}
          inputType={INPUT_TYPE.DROPDOWN}
          onInputChange={selected =>
            this.handleAddMeasurementInputChange(sessionId, dayId, selected)
          }
          title="+ Add Measurement"
          style={{ marginLeft: "20px" }}
          options={this.state.measurementOptions}
        />
      ) : item.id === PLACEHOLDER_ID_FILE ? (
        <PlaceholderItem
          key={index}
          inputType={INPUT_TYPE.DROPDOWN}
          onInputChange={selected =>
            this.handleAddFileInputChange(sessionId, dayId, selected)
          }
          title="+ Add File"
          style={{ marginLeft: "20px" }}
          options={this.state.fileOptions}
        />
      ) : (
        <div key={index} className={this.props.classes.item_margin}>
          <span className={this.props.classes.label_title}>
            {item.label}
            <a
              className={this.props.classes.delete_wrapper}
              onClick={() => this.handleDelete(item.id)}
            >
              <DeleteIcon className={this.props.classes.delete_icon} />
            </a>
          </span>
        </div>
      );
    });
  };

  renderSessions = (sessions, dayId) => {
    return sessions.map((session, index) => {
      return session.id === PLACEHOLDER_ID ? (
        <PlaceholderItem
          key={index}
          inputType={INPUT_TYPE.DROPDOWN}
          onAddClick={() => {
            this.handleAddSessionClick(dayId);
          }}
          onInputChange={this.handleAddSessionInputChange}
          title="+ Add Session"
          style={{ marginLeft: "10px" }}
          inputPlaceholderText="Enter Session Title"
        />
      ) : (
        <div key={index} className={this.props.classes.item_margin}>
          <span className={this.props.classes.label_title}>
            {session.label}
            <a
              className={this.props.classes.delete_wrapper}
              onClick={() => this.handleDelete(session.id)}
            >
              <DeleteIcon className={this.props.classes.delete_icon} />
            </a>
          </span>
          {this.renderMeasurementAndFiles(
            session.measurements,
            session.files,
            session.id,
            dayId
          )}
        </div>
      );
    });
  };

  renderDays = (day, index) => {
    return (
      <div key={index} style={{ marginBottom: "8px" }}>
        {/* <CardContent> */}
        <span className={this.props.classes.label_title}>
          {day.label}
          <a
            className={this.props.classes.delete_wrapper}
            onClick={() => this.handleDelete(day.id)}
          >
            <DeleteIcon className={this.props.classes.delete_icon} />
          </a>
        </span>
        {this.renderSessions(day.sessions, day.id)}
        {/* </CardContent> */}
      </div>
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
    const { days } = this.state;
    console.log({ state: this.state.days });
    return (
      <div className={classes.root}>
        <div className={classes.header_wrapper}>
          <div>
            <h3>Create Curriculum</h3>
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
        <Card style={{ marginBottom: "8px", overflow: "initial" }}>
          <CardContent>
            <Input
              style={{ width: "200px", marginBottom: "24px" }}
              placeholder="Curriculum Name"
            />
            {days.map((day, index) => {
              return day.id === PLACEHOLDER_ID ? (
                <PlaceholderItem
                  key={index}
                  type={RESOURCE_ITEMS.DAY}
                  onInputChange={this.handleAddDayInputChange}
                  onAddClick={this.handleAddDayClick}
                  title="+ Add Day"
                  inputPlaceholderText="Enter Day Title"
                />
              ) : (
                this.renderDays(day, index)
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Cirriculum);
