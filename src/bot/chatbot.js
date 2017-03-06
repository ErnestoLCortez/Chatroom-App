export var ChatBot = {

  processMessage: function(message) {
    var messageText = message.text;
    if (messageText.substring(0, 2) === "!!") {
      return {
        messageText: messageText,
        botMessage: this.processBotCommand(message)
      }
    }

    return {
      messageText: messageText,
      botMessage: null,
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

  userDisconnect: function(user) {
    return {
      username: "Bot",
      text: user + " has left the channel.",
      avatar: "img/robot.png",
    };
  },

  userConnect: function(user) {
    return {
      username: "Bot",
      text: user + " has entered the channel.",
      avatar: "img/robot.png",
    };
  },

  botResponses: {
    about: "Description of chat app",
    invalid: "Unrecognized command"
  }



};
