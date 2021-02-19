import * as React from "react";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { FormDetails } from "../interface/FormDetails";
import { LoginProperties } from "../interface/LoginProperties";

export default class Login extends Component<LoginProperties, FormDetails> {
  render() {
    return (
      <div>
        <Container component="main" maxWidth="sm">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.props.handleLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={this.props.onChangeUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.props.onChangePassword}
            />

            {this.props.hasError ? (
              <Alert severity="error">{this.props.errorMessage}</Alert>
            ) : (
              ""
            )}

            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}
