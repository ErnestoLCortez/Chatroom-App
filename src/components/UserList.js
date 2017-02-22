import * as React from 'react';
import {
  Socket
}
from './Socket';
import {
  List,
  ListItem
}
from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {
  users
}
from '../data/Users';

export class UserList extends React.Component {

  componentDidMount() {
    Socket.on('connect', function(data) {
      var nickname = prompt("Username?");
      Socket.emit('join', nickname);
    });
  }

  renderChatMessages() {
    return this.state.messages.map((message, i) =>
      <ListItem key={i} primaryText= {message.username}
          secondaryText={message.text}
          leftAvatar={<Avatar src={message.avatar} />
    }
    rightIcon = {
      <CommunicationChatBubble />
    }
    />
  );
}

render() {
  return (
    <List>
        {this.renderChatMessages()}
      </List>
  );
}
}
