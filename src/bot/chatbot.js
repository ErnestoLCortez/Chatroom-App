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

    if (command.substring(0, 3) === 'say') {
      return {
        username: "Bot",
        text: command.substring(3).trim(),
        avatar: "img/robot.png",
      };
    }
    if (command === 'hello' || command === 'bye') {
      return {
        username: "Bot",
        text: this.botResponses[command] + message.username + "!",
        avatar: "img/robot.png",
      };
    }
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
    about: "This is a chat room to discuss the weather.  Niiice.",
    invalid: "Unrecognized command",
    help: "Available commands:\n" +
      "about: gives a description of the channel\n" +
      "help: list of commands\n" +
      "say: bot parrots your words\n" +
      "hello: say hello to chatbot\n" +
      "bye: say bye to chatbot\n" +
      "weather: get today's weather description\n",
    say: "",
    hello: "Hi, ",
    bye: "Bye, ",
    weather: 'Fetching weather...',
  }



};
