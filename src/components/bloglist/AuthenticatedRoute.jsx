import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../api/articles/AuthenticationService.js'


class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserloggedIn()) {
            return(<Route {...this.props} />)
        }
        else {
            return(<Redirect to="/login/" />)
        }
    }
}

export default AuthenticatedRoute