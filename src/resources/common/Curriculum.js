import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardContent,
  Button,
  Input,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import filterDeep from "deepdash/filterDeep";
import PlaceholderItem from "../create/PlaceholderItem";
import { RESOURCE_ITEMS, INPUT_TYPE } from "../../utils";
import api from "../../api";
import DeleteIcon from "@material-ui/icons/Clear";
import FlareIcon from "@material-ui/icons/Flare";
import { withSnackbar } from "notistack";

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
    left: "8px",
    top: "4px",
    cursor: "pointer"
  },
  compulsory_icon: {
    fontSize: "14px",
    position: "absolute",
    left: "24px",
    top: "4px",
    cursor: "pointer"
  },
  delete_wrapper: { position: "relative" },
  border_wrapper: {
    border: "2px solid #dcdcdc",
    padding: "16px",
    borderRadius: "4px"
  }
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

class Curriculum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [PLACEHOLDER_DAY],
      fileOptions: [],
      measurementOptions: [],
      isEdit: false
    };
  }
  componentDidMount() {
    const { initialData } = this.props;
    const isEdit = initialData ? true : false;
    this.setState({ isEdit: isEdit });
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
    api.getSessionsForNgo(ngoKey).then(({ data }) => {
      const sanitizedOptions = data.map(option => {
        return {
          label: option.label,
          value: option.data
        };
      });
      this.setState({ sessionOptions: sanitizedOptions });
    });
    if (initialData) this.setState({ days: initialData });
  }

  /**
   * all DAY related callbacks
   * watch inputfield change value and create add callbacks
   * START
   */
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

  /**
   * DAY callbacks END
   */

  /**
   * all SESSION related callbacks
   * watch session createable select dropdowns
   * and add session callbacks START
   */

  handleSessionCreateOption = (value, dayId) => {
    this.handleAddSessionClick(dayId, value);
  };
  handleAddSessionOptionSelected = (dayId, { label, value }) => {
    const sessionId = this.handleAddSessionClick(dayId, label);
    const { measurements, files } = value;
    for (let i = 0; i < measurements.length; i++) {
      const measurement = measurements[i];
      this.handleAddMeasurementClick(sessionId, dayId, measurement.key);
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.handleAddFileClick(sessionId, dayId, file.key);
    }
  };
  handleAddSessionClick = (dayId, label) => {
    const { days } = this.state;
    const updatedDays = Array.from(days);
    const dayIndex = findIndex(days, { id: dayId });
    const updatedSessions = days[dayIndex].sessions;
    const index = updatedSessions.length;
    const id = randomId("session");
    updatedSessions.splice(index - 1, 1, {
      label,
      id,
      measurements: [PLACEHOLDER_MEASUREMENT],
      files: [PLACEHOLDER_FILE]
    });
    updatedSessions.push(PLACEHOLDER_SESSIONS);
    const updatedDay = { ...days[dayIndex], sessions: updatedSessions };
    updatedDays.splice(dayIndex, 1, updatedDay);
    this.setState({ days: updatedDays });
    return id;
  };
  /**
   * SESSION callbacks END
   */

  /**
   * add MEASUREMENT related callbacks
   * input change and creation of measurement node
   * START
   */
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
  handleAddMeasurementClick = (sessionId, dayId, label) => {
    const { days, measurementLabel } = this.state;
    if (measurementLabel) label = measurementLabel;
    const updatedDays = Array.from(days);
    const dayIndex = findIndex(days, { id: dayId });
    const sessionIndex = findIndex(days[dayIndex].sessions, { id: sessionId });
    const updatedSessions = days[dayIndex].sessions;
    const updatedMeasurements =
      days[dayIndex].sessions[sessionIndex].measurements;
    const index = updatedMeasurements.length;
    updatedMeasurements.splice(index - 1, 1, {
      label: label,
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
  handleSetCompulsory = id => {
    const updatedDays = Array.from(this.state.days);
    updatedDays.forEach(day => {
      if (day.id === PLACEHOLDER_ID) return;
      const { sessions } = day;
      sessions.forEach(session => {
        const { measurements } = session;
        const index = findIndex(measurements, { id: id });
        if (index > -1) {
          measurements[index].is_required = !measurements[index].is_required;
        }
      });
    });
    this.setState({ days: updatedDays });
  };
  /**
   * MEASUREMENT callbacks END
   */

  /**
   * add FILE related callbacks
   * input change and creation of file node
   * START
   */
  handleAddFileInputChange = (sessionId, dayId, { label, value }) => {
    this.setState(
      () => ({ fileLabel: value }),
      () => {
        this.handleAddFileClick(sessionId, dayId);
      }
    );
  };
  handleAddFileClick = (sessionId, dayId, label) => {
    const { days, fileLabel } = this.state;
    if (fileLabel) label = fileLabel;
    const updatedDays = Array.from(days);
    const dayIndex = findIndex(days, { id: dayId });
    const sessionIndex = findIndex(days[dayIndex].sessions, { id: sessionId });
    const updatedSessions = days[dayIndex].sessions;
    const updatedFiles = days[dayIndex].sessions[sessionIndex].files;
    const index = updatedFiles.length;
    const id = randomId("file");
    updatedFiles.splice(index - 1, 1, {
      label,
      id
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
  /**
   * FILE callbacks END
   */

  /**
   * DELETE any node
   */
  handleDelete = id => {
    console.log(id);
    const updatedDays = this.findAndDeleteNode(id);
    console.log(updatedDays);
    this.setState({ days: updatedDays });
  };
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
            const { measurements, files } = sessions[j];
            if (findIndex(measurements, { id: id }) > -1) {
              const mIndex = findIndex(measurements, { id: id });
              measurements.splice(mIndex, 1);
              return updatedDays;
            }
            if (findIndex(files, { id: id }) > -1) {
              const fIndex = findIndex(files, { id: id });
              files.splice(fIndex, 1);
              return updatedDays;
            }
          }
        }
      }
    }
    return updatedDays;
  };

  /**
   * submit data to server.
   */
  processPostData = () => {
    const { days, curriculumName } = this.state;
    const filteredDays = days.filter(day => {
      return day.id !== PLACEHOLDER_ID;
    });
    filteredDays.forEach(day => {
      const { sessions } = day;
      const filteredSessions = sessions.filter(session => {
        return session.id !== PLACEHOLDER_ID;
      });
      filteredSessions.forEach(session => {
        const { measurements, files } = session;
        const filteredMeasurements = measurements.filter(item => {
          if (item.id !== PLACEHOLDER_ID_MEASUREMENT) {
            item.key = item.label;
            delete item.id;
            // delete item.label;
            item.is_required = !!item.is_required;
            return true;
          }
          return false;
        });
        const filteredFiles = files.filter(item => {
          if (item.id !== PLACEHOLDER_ID_FILE) {
            item.key = item.label;
            delete item.id;
            // delete item.label;
            return true;
          }
          return false;
        });
        delete session.id;
        session.type = "session";
        session.measurements = filteredMeasurements;
        session.files = filteredFiles;
      });
      delete day.id;
      day.type = "day";
      day.sessions = filteredSessions;
    });
    return filteredDays;
  };
  handleSubmit = is_submitting => {
    const { days, curriculumName, isEdit, curriculumDescription } = this.state;
    if(!!curriculumName) return;
    const filteredDays = this.processPostData();
    const payload = {
      data: filteredDays,
      label: curriculumName,
      description : curriculumDescription,
      type: "curriculum",
      is_submitting
    };
    if (isEdit) {
      const {
        match: {
          params: { id: resourceKey }
        }
      } = this.props;
      api
        .saveCurriculum(resourceKey, payload)
        .then(response => {
          api.handleSuccess(response, this.props.enqueueSnackbar);
          this.props.history.push(this.props.basePath);
        })
        .catch(error => {
          api.handleError(error.response, this.props.enqueueSnackbar);
        });
    } else {
      api
        .createCurriculum(payload)
        .then(response => {
          api.handleSuccess(response, this.props.enqueueSnackbar);
          this.props.history.push(this.props.basePath);
        })
        .catch(error => {
          api.handleError(error.response, this.props.enqueueSnackbar);
        });
    }
  };
  handleSave = () => {
    this.handleSubmit(false);
  };

  render() {
    const { classes, initialData, ...props } = this.props;
    const { days, isEdit } = this.state;
    console.log({ state: this.state.days });
    return (
      <div className={classes.root}>
        <div className={classes.header_wrapper}>
          <div>
            <h3>{isEdit ? "Edit" : "Create"} Curriculum</h3>
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
        <Card style={{ marginBottom: "8px", overflow: "initial" }}>
          <CardContent>
            <div>
              <Input
                style={{ width: "200px", marginBottom: "24px" }}
                placeholder="Curriculum Name"
                onChange={({ target: { value } }) => {
                  this.setState({ curriculumName: value });
                }}
              />
            </div>
            <div>
              <Input
                style={{ width: "400px", marginBottom: "24px" }}
                placeholder="Curriculum Description"
                multiline
                onChange={({target : {value}}) => {this.setState({curriculumDescription:value})}}
              />
            </div>
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

  renderMeasurements = (measurements, sessionId, dayId) => {
    const { measurementOptions } = this.state;
    return measurements.map((item, index) => {
      return item.id === PLACEHOLDER_ID_MEASUREMENT ? (
        <PlaceholderItem
          key={index}
          inputType={INPUT_TYPE.DROPDOWN}
          onInputChange={selected =>
            this.handleAddMeasurementInputChange(sessionId, dayId, selected)
          }
          title="+ Add Measurement"
          style={{ marginLeft: "20px", marginTop: "10px" }}
          options={this.state.measurementOptions}
        />
      ) : (
        <div key={index} className={this.props.classes.item_margin}>
          <span>{`${index + 1}. `}</span>
          <span className={this.props.classes.label_title}>
            {find(measurementOptions, { value: item.label })
              ? find(measurementOptions, { value: item.label }).label
              : ""}
            <a className={this.props.classes.delete_wrapper}>
              <DeleteIcon
                onClick={() => this.handleDelete(item.id)}
                className={this.props.classes.delete_icon}
              />
            </a>
          </span>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={item.is_required}
                  onChange={() => {
                    this.handleSetCompulsory(item.id);
                  }}
                />
              }
              label="Make Field Mandatory"
            />
          </div>
        </div>
      );
    });
  };

  renderFiles = (files, sessionId, dayId) => {
    const { fileOptions } = this.state;
    return files.map((item, index) => {
      return item.id === PLACEHOLDER_ID_FILE ? (
        <PlaceholderItem
          key={index}
          inputType={INPUT_TYPE.DROPDOWN}
          onInputChange={selected =>
            this.handleAddFileInputChange(sessionId, dayId, selected)
          }
          title="+ Add File"
          style={{ marginLeft: "20px", marginTop: "10px" }}
          options={this.state.fileOptions}
        />
      ) : (
        <div key={index} className={this.props.classes.item_margin}>
          <span>{`${index + 1}. `}</span>
          <span className={this.props.classes.label_title}>
            {find(fileOptions, { value: item.label })
              ? find(fileOptions, { value: item.label }).label
              : ""}
            <a
              className={this.props.classes.delete_wrapper}
              onClick={() => this.handleDelete(item.id)}
            >
              <DeleteIcon className={this.props.classes.delete_icon} />
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
          inputType={INPUT_TYPE.CREATABLE_DROPDOWN}
          onInputChange={selected =>
            this.handleAddSessionOptionSelected(dayId, selected)
          }
          onCreateOption={value => {
            this.handleSessionCreateOption(value, dayId);
          }}
          title="+ Add Session"
          style={{ marginLeft: "10px", marginTop: "10px" }}
          inputPlaceholderText="Enter Session Title"
          options={this.state.sessionOptions}
        />
      ) : (
        <div
          key={index}
          className={this.props.classes.item_margin}
          style={{
            border: "2px solid #dcdcdc",
            padding: "16px",
            borderRadius: "4px"
          }}
        >
          <span className={this.props.classes.label_title}>
            {session.label}
            <a
              className={this.props.classes.delete_wrapper}
              onClick={() => this.handleDelete(session.id)}
            >
              <DeleteIcon className={this.props.classes.delete_icon} />
            </a>
          </span>
          {this.renderMeasurements(session.measurements, session.id, dayId)}
          {this.renderFiles(session.files, session.id, dayId)}
        </div>
      );
    });
  };

  renderDays = (day, index) => {
    return (
      <div
        className={this.props.classes.border_wrapper}
        key={index}
        style={{ marginBottom: "8px" }}
      >
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
}

export default withRouter(withSnackbar(withStyles(styles)(Curriculum)));
