var chatActions = require('./actions/chatActions.js');
var talkingPointActions = require('./actions/talkingPointActions.js');
var demoMessages = [
  'This is a fake chatroom. Have fun talking to yourself.',
  'The talking points to the right can be referenced during the conversation. ' +
    'Just type a # and then type some keywords to search over them: #dough-too-sticky',
  'Also, you can select text in the conversation and right-click to add a ' +
    'new talking point.'
];
var demoTalkingPoints = [
  'Burnt my tongue',
  'Dough too sticky',
  'Sauce too sweet',
  'Pizza contains gluten'
];

demoMessages.map(chatActions.sendMessage);
demoTalkingPoints.map(talkingPointActions.addTalkingPoint);
