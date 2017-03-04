import * as React from 'react';
import {
  List,
  ListItem
}
from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {
  Socket
}
from './Socket.js';

export class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveMessages = this.receiveMessages.bind(this);
    this.renderChatMessages = this.renderChatMessages.bind(this);
  }

  componentDidMount() {
    Socket.on('initMessages', this.receiveMessages)
    Socket.on('messages', this.receiveMessage);
  }

  receiveMessages(messages) {
    console.log("Client received:" + messages);
    messages.reverse();
    this.setState({
      messages: messages
    });
  }

  receiveMessage(message) {
    var {
      messages
    } = this.state;
    messages.push(message);
    this.setState({
      messages
    });
  }

  renderChatMessages() {
    console.log(this.state.messages);
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
