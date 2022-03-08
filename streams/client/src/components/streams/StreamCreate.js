import React from "react";
import { Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {createStream} from "../../actions";


class StreamCreate extends React.Component {

    renderInput = (formProps) => {
        // console.log(formProps);
        // return <input onChange={formProps.input.onChange} value={formProps.input.value} name={formProps.input.name}/>
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error': ''}`
        return (
            <div className={className}>
                <label htmlFor="">{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"/>
                {this.renderError(formProps.meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        // formValues comes form redux-form
        console.log(formValues)
        this.props.createStream(formValues);

    }
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    render() {
        // this.props.handleSubmit is coming from redux-form
        return (
            <form className={`ui form error`} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name={`title`} label="Enter Title" component={this.renderInput} />
                <Field name={`description`} label="Enter Description" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    let errors = {};
    if (!formValues.title) {
        // only run if the user didn't enter a title
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        // only run if the user didn't enter a title
        errors.description = 'You must enter a description';
    }

    // redux-form requires an emtpy object if no errors were found.
    return errors;
};


const formWrapped = reduxForm(
    {
        form: 'streamCreate',
        validate,
    }
)(StreamCreate);

export default connect(null, {createStream})(formWrapped);