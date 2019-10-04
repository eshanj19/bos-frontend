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

const PLACEHOLDER_MEASUREMENT = {
  id: PLACEHOLDER_ID
};

const PLACEHOLDER_SESSIONS = {
  id: PLACEHOLDER_ID,
  measurements: []
};

class Cirriculum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [PLACEHOLDER_DAY]
    };
  }
  componentDidMount() {
    // const { state } = this.props.location;
    console.log(this.props);
    const ngoKey = localStorage.getItem("ngo_key");
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

  handleAddDayClick = () => {
    const { days, dayLabel } = this.state;
    const updatedDays = Array.from(days);
    const index = updatedDays.length;
    // updatedDays.splice(index - 1,1);
    updatedDays.splice(index - 1, 1, {
      label: dayLabel,
      id: randomId(),
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
      id: randomId(),
      measurements: [PLACEHOLDER_MEASUREMENT]
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
      () => ({ measurementLabel: label }),
      () => {
        this.handleAddMeasurementClick(sessionId, dayId);
      }
    );
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
      id: randomId()
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

  renderMeasurements = (measurements, sessionId, dayId) => {
    return measurements.map((measurement, index) => {
      return measurement.id === PLACEHOLDER_ID ? (
        <PlaceholderItem
          key={index}
          type={RESOURCE_ITEMS.MEASUREMENT}
          onInputChange={selected =>
            this.handleAddMeasurementInputChange(sessionId, dayId, selected)
          }
          title="+ Add Measurement"
          inputPlaceholderText="Enter Measurement Title"
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
          measurementOptions={this.state.measurementOptions}
        />
      ) : (
        <div key={index} style={{ marginLeft: "20px" }}>
          <span className={this.props.classes.label_title}>
            {measurement.label}
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
          type={RESOURCE_ITEMS.SESSION}
          onAddClick={() => {
            this.handleAddSessionClick(dayId);
          }}
          onInputChange={this.handleAddSessionInputChange}
          title="+ Add Session"
          inputPlaceholderText="Enter Session Title"
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        />
      ) : (
        <div key={index} style={{ marginLeft: "20px" }}>
          <span className={this.props.classes.label_title}>
            {session.label}
          </span>
          {this.renderMeasurements(session.measurements, session.id, dayId)}
        </div>
      );
    });
  };

  renderDays = (day, index) => {
    return (
      <Card key={index} style={{ marginBottom: "8px" }}>
        <CardContent>
          <span className={this.props.classes.label_title}>{day.label}</span>
          {this.renderSessions(day.sessions, day.id)}
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
    const { days } = this.state;
    // console.log({state : this.state})
    return (
      <div className={classes.root}>
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

export default withStyles(styles)(Cirriculum);
