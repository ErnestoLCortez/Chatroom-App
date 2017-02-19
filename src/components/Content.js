import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  ChatBox
}
from './ChatBox';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export class Content extends React.Component {

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
        <TextField
          hintText="Message Group"
          fullWidth= {true}
        />
      </div>
    );
  }
}
