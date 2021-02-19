import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <Container component="main" maxWidth="md">
    <CssBaseline />
    <App></App>
  </Container>,
  document.getElementById("output")
);
