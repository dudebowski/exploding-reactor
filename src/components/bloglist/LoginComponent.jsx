import React, { Component } from 'react'
import AuthenticationService from '../../api/articles/AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'dudebowski',
            password: '',
            loginFailed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }


    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className= "container">
                    {this.state.loginFailed && <div className="alert alert-warning">Failure to launch, please try again</div>}
                UserName: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password:  <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/>
                    <button className="btn btn-success" onClick={this.loginClicked}>login</button>
                </div>
            </div>
        )
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        console.log (this.state.username + ':' + this.state.password)
        AuthenticationService.authenticate(this.state.username,this.state.password)
            .then (
                ()=> {
                    console.log("login succesfull")
                    AuthenticationService.registerLogin(this.state.username,this.state.password)
                    this.props.history.push(`/welcome/${this.state.username}`)
                }
            )
            .catch (
                ()=> {
                    console.log("login failed")
                    this.setState({loginFailed :  true})
                }
            )
    }
}

export default LoginComponent