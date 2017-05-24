import * as React from 'react';
var ReactDOM = require('react-dom');
import Infinite from 'react-infinite';
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
      messages: [],
    };
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveMessages = this.receiveMessages.bind(this);
    this.renderChatMessages = this.renderChatMessages.bind(this);
  }

  componentDidMount() {
    Socket.on('initMessages', this.receiveMessages);
    Socket.on('messages', this.receiveMessage);
  }


  receiveMessages(messages) {
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

  linkifyText(text) {
    if(typeof(text) == 'undefined' || text == null) return "";
    var LINK_DETECTION_REGEX = /^(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)($)/mi;
    if (text.search(LINK_DETECTION_REGEX) != -1) {
      if (text.substr(0, 4) === "http") {
        return text;
      }
      else {
        return "http://" + text;
      }
    }

    return '#';
  }

  imigfyText(text) {
    //console.log(text);

    if(typeof(text) == 'undefined' || text == null) return "";
    var IMG_DETECTION_REGEX = /^(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\.jpg|png|jpeg|gif)($)/mi;
    if (text.search(IMG_DETECTION_REGEX) != -1) {
      return <img src={text} style = {
        {
          height: 200
        }
      } />;
    }

    if (this.linkifyText(text).substr(0, 4) == 'http') {
      return <div style={{color:'#0000ff', textDecoration: 'underline'}}>
      {text}
      </div>;
    }

    return text;

  }

  renderChatMessages() {
    return this.state.messages.map((message, i) => {

        return <ListItem key={i} primaryText= {message.username}
          secondaryText={this.imigfyText(message.text)}
          leftAvatar={<Avatar src={message.avatar}/>
      }
      rightIcon = {
        <CommunicationChatBubble />
      }
      href = {
        this.linkifyText(message.text)
      }
      />;

    });
}

componentDidUpdate() {
  var node = ReactDOM.findDOMNode(this);
  node.scrollTop = node.scrollHeight;
}

render() {
  return (
    <Infinite
         timeScrollStateLastsForAfterUserScrolls={1000}
        containerHeight = {
          window.innerHeight -200
        }
        elementHeight = {
          51
        }
        displayBottomUpwards>
        {this.renderChatMessages()}
        </Infinite>
  );
}
}
