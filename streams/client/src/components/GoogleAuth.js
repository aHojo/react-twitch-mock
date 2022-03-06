import React from "react";
import {connect} from "react-redux";

import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {

    // State now comes from redux
    // state = {
    //     isSignedIn: null
    // }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '76041790911-79gel80a2u34401c4hl23notvn4qp313.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                // console.log(this.auth.isSignedIn.get())
                // // this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // isSignedIn is passed to the function by the google api
    onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
          // This is from redux in actions/index.js
          this.props.signIn(this.auth.currentUser.get().getId());
      } else {
          // This is from redux in actions/index.js
          this.props.signOut();
      }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }
    renderAuthButton() {

        if (this.props.isSignedIn === null) {
            return null;
        } else if ( this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon">
                        Sign Out
                    </i>
                </button>
            );
        }

        return (
            <button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon">
                    Sign In with Google
                </i>
            </button>
        );

    }
    render() {
        return (
            <div className={`item`}>
                {this.renderAuthButton()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);