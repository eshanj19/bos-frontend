import React, { Component } from "react";
import { CardContent, Card, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';
import head from 'lodash/head';
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
    color:'white',
    fontSize:'14px',
    "&:hover": { backgroundColor: "#3342a5c7" }
  },
  file_input:{display:'none'},
  header_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  file_upload_wrapper:{marginTop:'18px'},
  error : {color:'red',fontSize:'13px'}
};

const MAX_FILE_SIZE = 5 * 1000 * 1000; //5 MB

class CreateFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile : null,
      error : null
    };
  }
  handleFileChange = ({target}) => {
    const {files} = target;
    const selectedFile = head(files);
    const {size} = selectedFile;
    console.log(size);
    if(size > MAX_FILE_SIZE) {
      this.setState({selectedFile:null,error:"Maximum file size exceeded."})
      return;
    }
    this.setState({selectedFile,error:null});
  }
  handleSubmit = () => {
    const {selectedFile} = this.state;
    if(!selectedFile) return;
    const data = new FormData();
    data.append("file",selectedFile);
    api.submitFile("",data).then(({data}) => {
      this.props.history.goBack();
    })
  }
  render() {
    const {selectedFile,error} = this.state;
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
            <p>Select a file to upload. Maximum file size : 5 MB. All file types are supported. </p>
            <div className={this.props.classes.file_upload_wrapper}>
              <div style={{display:'flex',alignItems:'center'}}>
                <label htmlFor="file-upload" className={this.props.classes.custom_file_upload}>
                  <span>Select File</span>
                </label>
                <input onChange={this.handleFileChange} 
                  className={this.props.classes.file_input} 
                  id="file-upload" type="file" />
                {
                  selectedFile ? <span style={{marginLeft:'10px'}}>{selectedFile.name}</span> : null
                }
              </div>
            </div>
            {error ? <div className={this.props.classes.error}>{error}</div> : null}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CreateFile));
