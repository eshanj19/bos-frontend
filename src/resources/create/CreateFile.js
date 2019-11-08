import React, { Component } from "react";
import { CardContent, Card, Button, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import head from "lodash/head";
import api from "../../api";
import File from './../common/File';
import { withSnackbar } from "notistack";

export default function CreateFile(props) {
  return(
    <File/>
  )
}
