import React from 'react';
import renderer from 'react-test-renderer';

import {
  ChatBot
}
from '../src/bot/chatbot';

var testMessage = {
  username: 'testUser',
  text: '',
  avatar: '',
};

test('ChatBot object import.', () => {
  expect(ChatBot).toBeDefined();
});

test('ChatBot detects no commands', () => {
  testMessage.text = '! Aww whaddup';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '! Aww whaddup',
    botMessage: null,
  });
});

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

test('ChatBot detects say command', () => {
  testMessage.text = '!! say hi';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '!! say hi',
    botMessage: {
      username: "Bot",
      text: 'hi',
      avatar: "img/robot.png",
    }
  });
});

test('ChatBot detects help command', () => {
  testMessage.text = '!! help';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '!! help',
    botMessage: {
      username: "Bot",
      text: ChatBot.botResponses['help'],
      avatar: "img/robot.png",
    }
  });
});

test('ChatBot detects hello command', () => {
  testMessage.text = '!! hello';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '!! hello',
    botMessage: {
      username: "Bot",
      text: ChatBot.botResponses['hello'] + testMessage.username + "!",
      avatar: "img/robot.png",
    }
  });
});

test('ChatBot detects bye command', () => {
  testMessage.text = '!! bye';
  expect(ChatBot.processMessage(testMessage)).toEqual({
    messageText: '!! bye',
    botMessage: {
      username: "Bot",
      text: ChatBot.botResponses['bye'] + testMessage.username + "!",
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

test('ChatBot announce user connected', () => {
  expect(ChatBot.userConnect('Louie')).toEqual({
    username: "Bot",
    text: "Louie has entered the channel.",
    avatar: "img/robot.png",
  });
});


test('ChatBot announce user disconnected', () => {
  expect(ChatBot.userDisconnect('Louie')).toEqual({
    username: "Bot",
    text: "Louie has left the channel.",
    avatar: "img/robot.png",
  });
});
