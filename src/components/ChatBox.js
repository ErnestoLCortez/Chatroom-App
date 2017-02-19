import * as React from 'react';
import {
  List,
  ListItem
}
from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

export class ChatBox extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    this.state.messages = [{
      "username": "Ben",
      "text": "Whaddup",
      "avatar": "https://placehold.it/350x350",
    }, {
      "username": "Sue",
      "text": "Yo",
      "avatar": "https://placehold.it/350x350",
    }, {
      "username": "Guy",
      "text": "Hello",
      "avatar": "https://placehold.it/350x350",
    }, ];
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
