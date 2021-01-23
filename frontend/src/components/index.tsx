import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import Login from "./login";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Container component="main" maxWidth="md">
    <CssBaseline />
    <App></App>
  </Container>,
  document.getElementById("output")
);

// serviceWorker.unregister();
