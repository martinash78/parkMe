import * as React from "react";
import { Component, Fragment } from "react";
import AuthService from "../services/auth.service";
import Login from "./login";
import Profile from "./profile";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { AppState } from "../interface/AppState";

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      currentUser: {
        username: "",
        password: "",
        loggedIn: !!AuthService.getCurrentUser(),
      },
      hasLoginError: false,
    };
  }

  logOut() {
    AuthService.logout();
    this.setState(() => ({
      currentUser: {
        loggedIn: false,
      },
    }));
  }

  onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => ({
      currentUser: {
        username: e.target.value,
        password: prevState.currentUser.password,
      },
    }));
  }

  onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => ({
      currentUser: {
        username: prevState.currentUser.username,
        password: e.target.value,
      },
    }));
  }

  handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthService.login(
      this.state.currentUser.username,
      this.state.currentUser.password
    ).then(
      () => {
        this.setState(() => ({
          currentUser: {
            username: "",
            password: "",
            loggedIn: true,
          },
          hasLoginError: false,
          loginErrorMessage: "",
        }));
      },
      (error) => {
        this.setState((prevState) => ({
          currentUser: {
            username: prevState.currentUser.username,
            password: prevState.currentUser.password,
            loggedIn: false,
          },
          hasLoginError: true,
          loginErrorMessage: error.message,
        }));
      }
    );
  };

  render() {
    const isLoggedIn: boolean = this.state.currentUser.loggedIn;
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <h2>ParkMe</h2>
            {isLoggedIn && (
              <Grid container justify="flex-end">
                <Button onClick={this.logOut} color="inherit">
                  Logout
                </Button>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        <Box paddingTop={4} />
        {isLoggedIn ? (
          <Profile />
        ) : (
          <Login
            handleLogin={this.handleLogin}
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            hasError={this.state.hasLoginError}
            errorMessage={this.state.loginErrorMessage}
          />
        )}
      </Fragment>
    );
  }
}
