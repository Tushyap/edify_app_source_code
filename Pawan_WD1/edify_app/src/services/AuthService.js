import api from "./Api";

const SIGN_IN_URL = "/auth/sign-in";
const SIGN_UP_URL = "/auth/sign-up";

class AuthService {
  /**
   * Sends request to login endpoint in the API
   * If credentials correct then sets token value to localStorage
   * @param {*} email Email address
   * @param {*} password Passworw
   * @returns response.data
   */
  async login(email, password) {
    return api.post(SIGN_IN_URL, { email, password });
  }

  /**
   * Takes a new user data then sends request for signing up
   * @param {*} data Provide user data for sign-up
   * @returns response.data
   */
  register(data) {
    return api.post(SIGN_UP_URL, data);
  }
  
  createNewUser(data){
    return api.post(SIGN_UP_URL, data);
  }
  
  /**
   * Removes token value from localStorage
   */
  logout = () => {
    localStorage.removeItem("token");
  };
}

export default new AuthService();
