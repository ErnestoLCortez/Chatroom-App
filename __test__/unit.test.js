import {
  ChatBot
}
from '../src/bot/chatbot';


test('Unit file test', () => {
  expect('default').toBe('default');
});

var testMessage = {
  username: 'test',
  text: '',
  avatar: '',
};

test('ChatBot detects ABOUT command', () => {
  testMessage.text = '!! about';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '!! about',
    botMessage: {
      username: "Bot",
      text: ChatBot.botResponses['about'],
      avatar: "img/robot.png",
    }
  });
});

test('ChatBot detects INVALID command', () => {
  testMessage.text = '!! aboutt';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '!! aboutt',
    botMessage: {
      username: "Bot",
      text: ChatBot.botResponses['invalid'],
      avatar: "img/robot.png",
    }
  });
});
