import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from '../../api/articles/AuthenticationService.js'
import {withRouter} from 'react-router'

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserloggedIn();
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark" >
                    <div><a href="http://www.disturbedechoes.com" className="navbar-brand">disturbed echoes</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/dudebwoski" >Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/articles" >Articles</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn &&  <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.registerLogout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)