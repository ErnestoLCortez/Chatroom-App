import * as React from 'react';
import {
  List,
  ListItem
}
from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {
  messages
}
from '../data/Messages';
import {
  Socket
}
from './Socket.js';

export class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: messages
    };

  }

  componentDidMount() {
    Socket.on('messages', function(messageList) {
      this.state.messages = messageList;
    });

  }

  renderChatMessages() {

    return messages.map((message, i) =>
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
