import React, { Component } from "react";
import { CardContent, Card, Button, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import head from "lodash/head";
import api from "../../api";
import { withSnackbar } from "notistack";

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

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      error: null,
      selectedFileName: null,
      fileDescription: ""
    };
  }
  componentDidMount() {
    const { initialData } = this.props;
    if (initialData) {
      const { selectedFileName, fileDescription } = initialData;
      this.setState({
        isEdit: !!initialData,
        selectedFileName,
        fileDescription,
        selectedFile: {}
      });
    }
  }
  handleChange = event => {
    this.setState({ selectedFileName: event.target.value });
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
      selectedFileName: selectedFile.name
    });
  };
  handleSubmit = () => {
    const { selectedFile, selectedFileName, fileDescription } = this.state;
    if (!selectedFile) return;
    if (!selectedFileName) return;

    const data = new FormData();
    data.append("label", selectedFileName);
    data.append("description", fileDescription);
    data.append("type", "file");
    if (this.state.isEdit) {
      const {
        match: {
          params: { id: resourceKey }
        }
      } = this.props;
      api
        .editFile(resourceKey, data)
        .then(response => {
          api.handleSuccess(response, this.props.enqueueSnackbar);
          this.props.history.goBack();
        })
        .catch(error => {
          api.handleError(error, this.props.enqueueSnackbar);
        });
    } else {
      data.append("file", selectedFile);
      data.append("is_active", true);
      data.append("is_shared", false);
      api
        .submitFile(data)
        .then(response => {
          api.handleSuccess(response, this.props.enqueueSnackbar);
          this.props.history.goBack();
        })
        .catch(error => {
          api.handleError(error, this.props.enqueueSnackbar);
        });
    }
  };
  render() {
    const { selectedFile, error, selectedFileName } = this.state;
    return (
      <div>
        <div className={this.props.classes.header_wrapper}>
          <div>
            <h3>Create File Resource</h3>
          </div>
          <div>
            <Button onClick={this.handleSubmit} color="primary">
              Save
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
                  disabled={this.state.isEdit}
                />
                {selectedFile ? (
                  <span style={{ marginLeft: "10px" }}>{selectedFileName}</span>
                ) : null}
              </div>
            </div>
            {error ? (
              <div className={this.props.classes.error}>{error}</div>
            ) : null}

            {selectedFile ? (
              <>
                <div>
                  <TextField
                    label="File name"
                    // className={classes.grid_element}
                    value={selectedFileName}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <TextField
                    label="File Description"
                    // className={classes.grid_element}
                    value={this.state.fileDescription || ""}
                    style={{ width: "250px" }}
                    multiline
                    onChange={({ target }) => {
                      this.setState({ fileDescription: target.value });
                    }}
                  />
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(withSnackbar(withStyles(styles)(File)));
