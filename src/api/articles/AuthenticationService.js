import axios from 'axios'

import {API_URL} from '../../Constants.js'

class AuthenticationService {
    
    authenticate(username, password) {
        console.log(API_URL)
        return axios.get(`${API_URL}/basicauth`,{headers : {authorization : this.createBasicAuthToken(username, password)}})
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username+":"+password)
    }


    registerLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
        this.setUpAuthHeader(this.createBasicAuthToken(username, password));
    }

    registerLogout(username, password) {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserloggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return false;
        return true
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return '';
        return user;
    }

    setUpAuthHeader(authHeader) {
        axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = authHeader
                return config
            }
        )
    }
}

export default new AuthenticationService()