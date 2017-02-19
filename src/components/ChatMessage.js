import * as React from 'react';
import ListItem from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

export class ChatBox extends React.Component {

  render() {
    return (
      <ListItem
          primaryText="Brendan Lim"
          secondaryText="Hello."
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
    );
  }
}
