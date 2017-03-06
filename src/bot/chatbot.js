export var ChatBot = {

  LINK_DETECTION_REGEX: /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi,
  IMG_DETECTION_REGEX: /^(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\.jpg|png|jpeg|gif)($)/mi,
  processMessage: function(message) {
    var messageText = message.text;
    if (messageText.substring(0, 2) === "!!") {
      return {
        messageText: messageText,
        botMessage: this.processBotCommand(message)
      }

    }
    else if (messageText.search(this.IMG_DETECTION_REGEX) != -1) {
      return {
        messageText: '<img src="' + messageText + '">',
        botMessage: null
      }
    }
    else {
      return {
        messageText: messageText.replace(this.LINK_DETECTION_REGEX, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
        }),
        botMessage: null,
      }
    }
  },

  processBotCommand: function(message) {
    var command = message.text;
    command = command.substring(2).trim();

    if (command in this.botResponses) {
      return {
        username: "Bot",
        text: this.botResponses[command],
        avatar: "img/robot.png",
      };
    }
    return {
      username: "Bot",
      text: this.botResponses['invalid'],
      avatar: "img/robot.png",
    };

  },

  botResponses: {
    about: "Description of chat app",
    invalid: "Unrecognized command"
  }


};
