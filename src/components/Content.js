import * as React from 'react';
import AppBar from 'material-ui/AppBar';
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

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      textFieldValue: event.target.value
    });

  }

  handleSubmit(event) {
    if (this.state.textFieldValue) {

      var message = {
        username: 'test',
        text: this.state.textFieldValue,
        avatar: "https://placehold.it/350x350"
      }
      Socket.emit("messages", message);
      console.log(message);
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
          title="Cool Chat Thing"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <br />
        <ChatBox />
        <br />
        <form onSubmit={this.handleSubmit} style={styles.rowStyle}>
          <TextField
            id='textField'
            onChange={this.handleChange}
            value={this.state.textFieldValue}
          />
          <RaisedButton label="Send" primary={true} style={styles.buttonStyle}>
            <input type="submit" style={styles.inputStyle}/>
          </RaisedButton>
        </form>
      </div>
    );
  }
}
