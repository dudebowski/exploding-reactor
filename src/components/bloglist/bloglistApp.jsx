import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ArticleListComponent from './ArticleListComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LogoutComponent from   './LogoutComponent.jsx'
import FooterComponent from   './FooterComponent.jsx'
import ArticleComponent from   './ArticleComponent.jsx'

import './bloglistApp.css'

class BloglistApp extends Component {
    render() {
        return (
            <div className="BloglistApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/articles/:id" component={ArticleComponent} />
                        <AuthenticatedRoute path="/articles" component={ArticleListComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ShitHappened} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}


function ShitHappened() {
    return <div>Something wrong</div>
}

export default BloglistApp