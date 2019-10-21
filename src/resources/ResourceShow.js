import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import  {withRouter} from 'react-router-dom';
import api from '../api';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  required_star : {'marginLeft' : '5px', color:'red'},
  view_file : {'marginLeft' : '5px', cursor:'pointer',color:'gray'},
  ml10 : {marginLeft:'10px'},
  ml20 : {marginLeft:'20px'}
}

function ResourceShow(props) {
  const [resourceData, setResourceData] = useState({});
  const [measurementMaster, setMeasurementMaster] = useState([]);
  const [fileMaster, setFileMaster] = useState([]);
  useEffect(() => {
    const ngoKey = localStorage.getItem("ngo_key");
    const {params : {id}} = props.match;
    api.getResource(id).then(({data}) => {
      setResourceData(data);
    });
    api.getMeasurementDropdownOptionsForNgo(ngoKey).then(({data}) => {
      setMeasurementMaster(data);
    })
    api.getFileDropdownOptionsForNgo(ngoKey).then(({data}) => {
      setFileMaster(data);
    })
  },[]);
  const _renderFiles = (files) => {
    if(!files || files.length === 0 || fileMaster.length === 0) return [];
    const view = [];
    view.push(<h5>Files : </h5>);
    const fileView = files.map((f) => {
      const file = find(fileMaster,{key : f.key})
      if(!file) return;
      return(
        <div key={uniqueId()}>
          {file.label}
          <a target="_blank" rel="noopener noreferrer" href={file.data.url}>
            <span className={props.classes.view_file}>view</span>
          </a>
        </div>
      )
    })
    view.push(fileView);
    return <div className={props.classes.ml20}>{view}</div>;
  }

  const _renderMeasurements = (measurements) => {
    if(!measurements || measurements.length === 0 || measurementMaster.length === 0) return [];
    const view = [];
    view.push(<h5>Measurements : </h5>);
    const measurementView = measurements.map((m) => {
      const measurement = find(measurementMaster,{key : m.key});
      if(!measurement) return;
      return(
        <div key={uniqueId()}>
          {measurement.label}
          {!measurement.is_required ? <span className={props.classes.required_star}>*</span> : null}
        </div>
      )
    })
    view.push(measurementView);
    return <div className={props.classes.ml20}>{view}</div>;;
  }
  const _renderSession = (data) => {
    const {files,measurements} = data;
    const view = [];
    view.push(<h4 key={uniqueId()}>{data.label}</h4>);
    view.push(_renderFiles(files))
    view.push(_renderMeasurements(measurements));
    return <div className={props.classes.ml10}>{view}</div>;
  }
  const renderSession = () => {
    const {data} = resourceData;
    return _renderSession(data);
  }
  const renderCurriculum = () => {
    const {data : days,label=''} = resourceData;
    console.log(days);
    const view = [];
    view.push(<h3>{label}</h3>)
    const daysView = days.map((day) => {
      const {sessions} = day;
      const sessionView = sessions.map((session) => _renderSession(session));
      const view = [];
      view.push(<h5>{day.label}</h5>)
      view.push(sessionView);
      return view;
    })
    view.push(daysView);
    return view;
  }
  return(
    <Card>
      <CardContent>
        {
          resourceData.type === 'session' ?
          renderSession() :
          resourceData.type === 'curriculum'?
          renderCurriculum():
          <div></div>
        }
      </CardContent>
    </Card>
  )
}

export default withRouter(withStyles(styles)(ResourceShow));