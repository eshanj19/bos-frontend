import { withStyle } from "@material-ui/core";
import React from "react";
import { TextField } from "react-admin";

const DataField = ({ classes, ...props }) => (
  <TextField style={{ fontSize: "15px" }} {...props}></TextField>
);

DataField.defaultProps = {
  addLabel: true
};

export default DataField;
