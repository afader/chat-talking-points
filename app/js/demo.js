var chatActions = require('./actions/chatActions.js');
var talkingPointActions = require('./actions/talkingPointActions.js');
var demoMessages = [
  'This is a fake chatroom. Have fun talking to yourself.',
  'The talking points to the right can be referenced during the conversation. ' +
  'Like #dough-too-sticky. A textcomplete box will appear when you type # and ' +
  'will do a keyword search over the talking points contents.',
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
