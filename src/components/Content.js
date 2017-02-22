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
};


export class Content extends React.Component {


  constructor() {
    super();
    this.state = {
      textFieldValue: '',
    };
  }

  handleTextFieldChange(e) {
    this.state.textFieldValue = e.target.value;
  }

  sendMessage() {
    if (this.state.textFieldValue) {

      var message = {
        username: test,
        text: this.state.textFieldValue,
        avatar: "https://placehold.it/350x350"
      }
      Socket.emit("messages", message);
    }
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
        <div style={styles.rowStyle}>
          <TextField
            hintText="Message Group"
            onChange={this.handleTextFieldChange}
          />
          <RaisedButton label="Send" primary={true} style={styles.buttonStyle} onClick={this.sendMessage()}/>
        </div>
      </div>
    );
  }
}
