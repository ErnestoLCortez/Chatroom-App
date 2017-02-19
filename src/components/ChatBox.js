import * as React from 'react';
import List from 'material-ui/List';


export class ChatBox extends React.Component {

  constructor() {
    super();
  }

  compontentDidMount() {

  }

  renderChatMessages() {

  }

  render() {
    return (
      <List>
        <ListItem
          primaryText="Brendan Lim"
          secondaryText="Hello."
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Eric Hoffman"
          secondaryText="Sup."
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Grace Ng"
          secondaryText="Fam."
          leftAvatar={<Avatar src="https://placehold.it/350x350" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </List>
    );
  }
}
