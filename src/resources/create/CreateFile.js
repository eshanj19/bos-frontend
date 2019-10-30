import React, { Component } from "react";
import { CardContent, Card, Button, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import head from "lodash/head";
import api from "../../api";

const styles = {
  custom_file_upload: {
    marginTop: "16px",
    marginBottom: "16px",
    boxShadow: "3px 4px 4px 0px #1716161c",
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "#28369354",
    cursor: "pointer",
    color: "white",
    fontSize: "14px",
    "&:hover": { backgroundColor: "#3342a5c7" }
  },
  file_input: { display: "none" },
  header_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  file_upload_wrapper: { marginTop: "18px" },
  error: { color: "red", fontSize: "13px" }
};

const MAX_FILE_SIZE = 5 * 1000 * 1000; //5 MB

class CreateFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      error: null,
      selectFileName: null
    };
  }
  handleChange = event => {
    this.setState({ selectFileName: event.target.value });
  };

  handleFileChange = ({ target }) => {
    const { files } = target;
    const selectedFile = head(files);
    const { size } = selectedFile;
    console.log(size);
    if (size > MAX_FILE_SIZE) {
      this.setState({
        selectedFile: null,
        error: "Maximum file size exceeded."
      });
      return;
    }
    this.setState({
      selectedFile,
      error: null,
      selectFileName: selectedFile.name
    });
  };
  handleSubmit = () => {
    const { selectedFile, selectFileName } = this.state;
    if (!selectedFile) return;
    if (!selectFileName) return;
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("label", selectFileName);
    data.append("type", "file");
    data.append("is_active", true);
    data.append("is_shared", false);
    api.submitFile(data).then(({ data }) => {
      this.props.history.goBack();
    });
  };
  render() {
    const { selectedFile, error, selectFileName } = this.state;
    return (
      <div>
        <div className={this.props.classes.header_wrapper}>
          <div>
            <h3>Create File Resource</h3>
          </div>
          <div>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>
            <p>
              Select a file to upload. Maximum file size : 5 MB. All file types
              are supported.{" "}
            </p>
            <div className={this.props.classes.file_upload_wrapper}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  htmlFor="file-upload"
                  className={this.props.classes.custom_file_upload}
                >
                  <span>Select File</span>
                </label>
                <input
                  onChange={this.handleFileChange}
                  id="file-upload"
                  className={this.props.classes.file_input}
                  type="file"
                />
                {selectedFile ? (
                  <span style={{ marginLeft: "10px" }}>
                    {selectedFile.name}
                  </span>
                ) : null}
              </div>
            </div>
            {error ? (
              <div className={this.props.classes.error}>{error}</div>
            ) : null}

            {selectedFile ? (
              <TextField
                label="File name"
                // className={classes.grid_element}
                value={selectFileName}
                onChange={this.handleChange}
              />
            ) : null}

            {/* <div className={this.props.classes.file_upload_wrapper}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  htmlFor="file-name"
                  className={this.props.classes.custom_file_upload}
                >
                  <span>File name</span>
                </label>
                <input
                  onChange={this.handleChange}
                  id="file-name"
                  value={selectFileName}
                  className={this.props.classes.file_input}
                  type="text"
                />
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CreateFile));
