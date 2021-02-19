export interface AppState {
  currentUser: {
    username?: string;
    password?: string;
    loggedIn?: boolean;
  };
  hasLoginError?: boolean;
  loginErrorMessage?: string;
}
