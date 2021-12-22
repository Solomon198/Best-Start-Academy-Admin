/* eslint-disable */
import logo from "./logo.svg";
import "../App.css";
import React from "react";
import Components from "../components/index";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}
class App extends React.Component<Props> {
  render() {
    return (
      <div id="page-top">
        <Components.AppMenu isHome />

        <Components.ShowCase scrollTo={() => ""} />

        <Components.AppFeatures />

        <Components.Contacts />

        <Components.Footer />
      </div>
    );
  }
}

export default withRouter(App);
