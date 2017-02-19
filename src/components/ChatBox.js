import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import {
  List,
  ListItem
}
from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

export class ChatBox extends React.Component {

  render() {
    return (
      <List>
        <ListItem
          primaryText="Brendan Lim"
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Eric Hoffman"
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Grace Ng"
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </List>
    );
  }
}
