import request from 'request-promise';

const API_BASE_URL = 'http://localhost:5000';

class AccountService {
  static login(account) {
    const options = {
      method: 'POST',
      uri: `${API_BASE_URL}/auth/login`,
      body: account,
      json: true,
    };

    return request
      .post(options)
      .then(body => body)
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
      });
  }

  static isLoggedIn() {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  static logout() {
    localStorage.removeItem('authToken');
  }

  static setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }
}

export default AccountService;
