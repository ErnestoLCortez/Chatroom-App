#What is the theme you'll be using for project 2?

It is a chat room for discussing the weather and weather type activities.

#How Did you incorporate your theme within your project?

I set a sky type background image.  Chatbot uses OpenWeatherAPI to fetch the current weather description

#What are known problems, if any, with your project?
Undesired behavior if user mimics weather response in the say command.  Send button not functional for sending message, must use enter key.

#How would you improve if if you had more time?
Styling of login buttons and user count.  Refactoring of socket functions and chatbot.

#Improvements from handin 1

• 18 points: client-side views and app layout
	○ 3 points: chat log of the room is always visible (messages sent and received) 
	○ 2 points: all connected users in a list is always visible 
	○ 1 point: current number of connected users is always visible 
	○ 2 points: all messages from other users must look consistent
	○ 1 point: username, nickname, or real name of the sender must be next to message
	○ 1 point: profile picture of the sender must be next to their name
• 10 points: chatbot
	○ 2 points: chatbot is clearly identifiable
	○ 2 points: bot messages room when people connect or leave
	○ 1 point: !! about makes the bot message the room with a description
	○ 1 point: !! help makes the bot message the room with a list of all commands
	○ 1 point: !! say <something> makes the bot say <something> to the room
	○ 1 point: 1 other command
	○ 1 point: another command 
	○ 1 point: bot acknowledges unrecognized commands
• 10 points: client-server connection
	○ 2 points: all clients are able to send message to web server
	○ 4 points: all messages received on server are relayed to all clients
	○ 1 point: all clients show new user on connect
	○ 1 point: all clients update count on connect
	○ 1 point: all clients remove user on disconnect
	○ 1 point: all clients update count on disconnect
• 10 points: offline persistence
	○ 5 points: chat log at / loads with recent or all history
	○ 5 points: messages are persisted via database
• 10 points: third-party authentication
	○ 3 point: users can only send messages after authentication
	○ 1 point: login with Facebook button is present on page and login flow works
	○ 1 point: username, nickname, email, or real name is pulled from FB
	○ 1 point: profile picture is pulled from FB
	○ 1 point: login with Google button is present on page and login flow works
	○ 1 point: username, nickname, email, or real name is pulled from Google
	○ 1 point: profile picture is pulled from Google
1 point: user doesn’t count as connected user until authenticated