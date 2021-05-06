import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'

import AuthenticationService from '../../api/articles/AuthenticationService.js'
import ArticleService from '../../api/articles/ArticleService.js'

class ArticleComponent extends Component {

    constructor(props) {
        console.log("constructor")
        super(props)
        this.state = {
            id: this.props.match.params.id,
            title: "",
            description: "",
            published: false,
            lastChangeDate: moment(new Date()).format('YYYY-MM-DD'),
            message: null
        }

        this.submit = this.submit.bind(this);
        this.validate = this.validate.bind(this);
    }
 
    componentDidMount() {
        if (this.state.id < 0) {return}
        console.log(this.state.id)
        let user = AuthenticationService.getLoggedInUser()
        ArticleService.get(user,this.state.id)
            .then(response =>
                this.setState(
                    {
                        title: response.data.title,
                        description: response.data.description,
                        lastChangeDate: moment(response.data.lastChangeDate).format('YYYY-MM-DD')
                    }
                )
            )
            .catch((error) => { 
                console.log (error)
                if(!error.response.data) {
                    this.setState({ welcomeMessage: error})
                }
                else {
                    this.setState({ welcomeMessage: error.response.data.message})
                }
            }
            )
    }

    submit(values) {
        let user = AuthenticationService.getLoggedInUser()
        let article = {
            id: this.state.id,
            title: values.title,
            description: values.description,
            published: values.published,
            lastChangeDate: values.lastChangeDate
        }
        if (this.state.id < 0) { 
            ArticleService.create(user, article)
            .then(() => this.props.history.push('/articles'))
        }
        else {
            ArticleService.update(user, this.state.id ,article)
            .then(() => this.props.history.push('/articles'))
        }
    }

    validate(values) {
        console.log("validate")
        let errors = {}
        if (!values.description) {
            errors.description = "description is mandatory"
        } else if (values.description.length < 10) {
            errors.description = "description should be more then 10 characters "
        }
        if (!values.title) {
            errors.title = "title is mandatory"
        }
        if (!moment(values.lastChangeDate).isValid()) {
            errors.lastChangeDate = "last change date is not valid"
        }  
        console.log(errors)  
        return errors;
    }

    render() {
        let {description, lastChangeDate, title}  = this.state
        return (
            <div>
                <h1>Article</h1>
                {/* {this.state.message && <div className="alert alert-success">{this.state.message}</div>} */}
                <div className="container" >
                    <Formik 
                        initialValues={{description,title,lastChangeDate}}
                        onSubmit = {this.submit} 
                        validate = {this.validate}
                        validateOnChange ={false}
                        validateOnBlur ={false}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="title" component="div" className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="lastChangeDate" component="div" className="alert alert-warning"></ErrorMessage>

                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last date</label>
                                        <Field className="form-control" type="date" name="lastChangeDate"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit" >OK</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }


}

export default ArticleComponent