import React from "react";
import { Route } from "react-router-dom";
import Configuration from "./configuration/Configuration";
import Curriculum from "./resources/create/Curriculum";
import Session from "./resources/create/Session";

export default [
  <Route exact path="/configuration" component={Configuration} />,
  <Route exact path="/resources/create/curriculum" component={Curriculum} />,
  <Route exact path="/resources/create/session" component={Session} />
];
