import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  ChatBox
}
from './ChatBox';
import {
  Socket
}
from './Socket.js';

import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyBg45r2ODEEGbjJT4dlbd8q1RWqxyGUQGY",
  authDomain: "cst438project2.firebaseapp.com",
  databaseURL: "https://cst438project2.firebaseio.com",
  storageBucket: "cst438project2.appspot.com",
};

injectTapEventPlugin();

firebase.initializeApp(config);


const styles = {
  buttonStyle: {
    margin: 12,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    maxWidth: '80%',
  },
  inputStyle: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export class Content extends React.Component {


  constructor() {
    super();
    this.state = {
      textFieldValue: '',
      user: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      this.setState({
        user: result.user
      });
    }.bind(this));

  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      this.setState({
        user: result.user
      });
    }.bind(this));
  }

  logOut() {
    firebase.auth().signOut().then(function() {
      this.setState({
        user: null
      });
    }.bind(this));
  }

  handleChange(event) {
    this.setState({
      textFieldValue: event.target.value
    });

  }

  handleSubmit(event) {
    if (this.state.textFieldValue && this.state.user) {

      var message = {
        username: this.state.user.email,
        text: this.state.textFieldValue,
        avatar: this.state.user.photoURL
      }
      Socket.emit("messages", message);
    }
    this.setState({
      textFieldValue: ""
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <AppBar 
          title="Cool Chat"
          iconElementRight={this.state.user ? 
            <FlatButton label="SignOut" onClick={this.logOut.bind(this)}/> : 
            <div>
              <FlatButton label="Login with FB" onClick={this.loginWithFacebook.bind(this)} />
              <FlatButton label="Login with Google" onClick={this.loginWithGoogle.bind(this)} />
            </div>}
        />
        <br />
        <ChatBox />
        <br />
        <form onSubmit={this.handleSubmit} style={styles.rowStyle}>
          <TextField
            id='textField'
            onChange={this.handleChange}
            value={this.state.textFieldValue}
            disabled={this.state.user ? false : true}
          />
          <RaisedButton label="Send" primary={this.state.user ? true : false} disabled={this.state.user ? false : true} style={styles.buttonStyle}>
            <input type="submit" style={styles.inputStyle}/>
          </RaisedButton>
        </form>
      </div>
    );
  }
}
