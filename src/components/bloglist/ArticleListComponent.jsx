import moment from 'moment'
import React, { Component } from 'react'

import ArticleService from '../../api/articles/ArticleService.js'
import AuthenticationService from '../../api/articles/AuthenticationService.js'


class ArticleListComponent extends Component {

    constructor(props) {
        console.log("constructor")
        super(props)
        this.state = {
            articles: []
            , message: null
        }

        this.deleteClicked = this.deleteClicked.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
        this.addClicked = this.addClicked.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillUnmount() {
        console.log("unmount")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("update")
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        let user = AuthenticationService.getLoggedInUser()
        ArticleService.getAll(user)
            .then(response =>
                this.setState({ articles: response.data })
            )
            .catch(error =>
                this.setState({ welcomeMessage: "something wrong" })
            )
    }

    deleteClicked(id) {
        let user = AuthenticationService.getLoggedInUser()
        ArticleService.delete(user, id).then(
            response => {
                this.setState({ message: `succesfull deleted id ${id}` })
                this.refresh()
            }
        )
    }

    updateClicked(id) {
        this.props.history.push(`/articles/${id}`)
    }

    addClicked() {
        console.log('add clicked')
        this.props.history.push('/articles/-1')
    }

    render() {
        console.log("render")
        return (
            <div>
                <h1>List of blogposts on disturbed echoes</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container" >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>description</th>
                                <th>published</th>
                                <th>last Date</th>
                                <th>update</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.articles.map(
                                    article =>
                                        <tr key={article.id}>
                                            <td>{article.title}</td>
                                            <td>{article.description}</td>
                                            <td>{article.published.toString()}</td>
                                            <td>{moment(article.lastChangeDate).format('YYYY-MM-DD HH:mm')}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateClicked(article.id)} >Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteClicked(article.id)} >Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row" >
                        <button className="btn btn-success" onClick={this.addClicked} >Add</button>
                    </div>
                </div>
            </div>
        )
    }


}

export default ArticleListComponent