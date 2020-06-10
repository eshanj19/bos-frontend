import React from "react";
import { Route } from "react-router-dom";
import Configuration from "./configuration/Configuration";
import CreateSession from "./resources/create/CreateSession";
import CreateCurriculum from "./resources/create/CreateCurriculum";
import EditCurriculum from "./resources/edit/EditCurriculum";
import EditSession from "./resources/edit/EditSession";
import CreateFile from "./resources/create/CreateFile";
import CreateRegistrationForm from "./resources/create/CreateRegistrationForm";
import EditFile from "./resources/edit/EditFile";
import EditRegistrationForm from "./resources/edit/EditRegistrationForm";
import OrganisationShow from "./organisation/OrganisationShow";

export default [
  <Route exact path="/organisation" component={OrganisationShow} />,
  <Route exact path="/configuration" component={Configuration} />,
  <Route
    exact
    path="/resources/create/curriculum"
    component={CreateCurriculum}
  />,
  <Route exact path="/resources/create/session" component={CreateSession} />,
  <Route exact path="/resources/create/file" component={CreateFile} />,
  <Route
    exact
    path="/resources/create/registration"
    component={CreateRegistrationForm}
  />,
  <Route
    exact
    path="/resources/edit/curriculum/:id"
    component={EditCurriculum}
  />,
  <Route exact path="/resources/edit/session/:id" component={EditSession} />,
  <Route exact path="/resources/edit/file/:id" component={EditFile} />,
  <Route
    exact
    path="/resources/edit/registration/:id"
    component={EditRegistrationForm}
  />,
];
