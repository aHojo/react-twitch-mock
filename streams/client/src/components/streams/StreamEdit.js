import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
class StreamEdit extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    };

    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        console.log(this.props);

        if (!this.props.stream) {
            return null;
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                {/* initialValues is special in reduxform and these look for the name property on the inputs that are in StreamForm */}
                {/* <StreamForm onSubmit={this.onSubmit} initialValues={{title: 'Edit Me', description: "Change me too"}} /> */}
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'description')} />
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    
    return {stream: state.streams[ownProps.match.params.id] };
}
export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);