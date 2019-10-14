import React from "react";
import { Route } from "react-router-dom";
import Configuration from "./configuration/Configuration";
import CreateSession from "./resources/create/CreateSession";
import Curriculum from "./resources/common/Curriculum";
import CreateCurriculum from "./resources/create/CreateCurriculum";
import Session from "./resources/common/Session";
import EditCurriculum from "./resources/edit/EditCurriculum";

export default [
  <Route exact path="/configuration" component={Configuration} />,
  <Route exact path="/resources/create/curriculum" component={CreateCurriculum} />,
  <Route exact path="/resources/create/session" component={CreateSession} />,
  <Route exact path="/resources/edit/curriculum/:id" component={EditCurriculum} />,
  <Route exact path="/resources/edit/session/:id" component={Session} />
];
