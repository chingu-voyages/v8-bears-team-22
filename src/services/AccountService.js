import request from 'request-promise';

const API_BASE_URL = 'http://localhost:5000/api';

class AccountService {
  static login(account) {
    const options = {
      method: 'POST',
      uri: `${API_BASE_URL}/account/login`,
      body: account,
      json: true,
    };

    return request.post(options).then(body => body).catch((err) => {
      console.log(err);
    });
  }
}

export default AccountService;
