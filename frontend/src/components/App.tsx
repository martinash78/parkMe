import * as React from "react";
import { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import Login from "./login";
import Profile from "./profile";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

interface AppState {
  currentUser: {
    username?: string;
    password?: string;
    loggedIn?: boolean;
  };
}

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
    };
  }

  logOut() {
    AuthService.logout();
    this.setState((prevState) => ({
      currentUser: {
        loggedIn: false,
      },
    }));
  }

  onChangeUsername(e: any) {
    this.setState((prevState) => ({
      currentUser: {
        username: e.target.value,
        password: prevState.currentUser.password,
      },
    }));
  }

  onChangePassword(e: any) {
    this.setState((prevState) => ({
      currentUser: {
        username: prevState.currentUser.username,
        password: e.target.value,
      },
    }));
  }

  handleLogin = (e: any) => {
    e.preventDefault();
    AuthService.login(
      this.state.currentUser.username,
      this.state.currentUser.password
    ).then(
      () => {
        this.setState((prevState) => ({
          currentUser: {
            username: prevState.currentUser.username,
            password: prevState.currentUser.password,
            loggedIn: true,
          },
        }));
      },
      (error) => {
        this.setState({
          currentUser: {
            loggedIn: true,
          },
        });
      }
    );
  };

  render() {
    const isLoggedIn = this.state.currentUser.loggedIn;
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
          />
        )}
      </Fragment>
    );
  }
}

export default App;
