import axios from "axios";

const API_URL = "http://localhost:8081/users/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch((errorMessage) => {
        throw new Error(errorMessage.response.data.error);
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getMe() {
    const token = this.getCurrentUser().token;
    return axios
      .get(API_URL + "me", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
