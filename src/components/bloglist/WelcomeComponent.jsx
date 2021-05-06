import React, { Component } from 'react';
import HelloService from '../../api/articles/HelloService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.getInfo = this.getInfo.bind(this);
        this.state = {
            welcomeMessage: ""
        }
    }

    render() {
        return (
            <>
                <h1>Good morning campers</h1>
                <div className="container">  <a href="\articles">Welcome</a>
                </div>
                <div className="container">
                    <button onClick={this.getInfo} className="btn btn-success" >Info  </button>
                </div>
                <div>
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    getInfo() {
        HelloService.execute(this.props.match.params.name)
            .then(response =>
                this.setState({ welcomeMessage: response.data.message })
            )
            .catch(error =>
                { 
                this.handleError(error);
                }
            )
        return;
    }

    handleError(error) {
        let errorMessage = '';
        if (error.message)
            errorMessage += error.message;
        if (error.response && error.response.data)
            errorMessage += error.response.data.message;
        this.setState({ welcomeMessage: errorMessage });
    }
}

export default WelcomeComponent

