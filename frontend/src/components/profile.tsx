import * as React from "react";
import { Component, Fragment } from "react";
import AuthService from "../services/auth.service";

interface Me {
  forename?: string;
}

export default class Profile extends Component<Me, {}> {

  constructor(props: {}) {
    super(props);
    AuthService.getMe().then((response) => {
      console.log(response.forename);
    });
  }

  componentDidMount() {}

  render() {
    return <div>Hello </div>;
  }
}
