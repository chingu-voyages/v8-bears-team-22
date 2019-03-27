import request from 'request-promise';

const API_BASE_URL = 'http://localhost:5000/api';

class AccountService {

    static login(account) {
        return request.post({url: `${API_BASE_URL}/account/login`, form: account}, (error, response, body) => {
            if (error) {
                // TODO error handling
            }
            return body;
        });
    }
}

export default AccountService;
