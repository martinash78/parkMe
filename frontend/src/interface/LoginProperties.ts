export interface LoginProperties {
  handleLogin: (e: any) => void;
  onChangeUsername: (e: any) => void;
  onChangePassword: (e: any) => void;
  hasError?: boolean;
  errorMessage?: string;
}
