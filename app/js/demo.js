var chatActions = require('./actions/chatActions.js');
var factorActions = require('./actions/factorActions.js');
var demoMessages = [
  'This is a fake chatroom. Have fun talking to yourself.',
  'The factors to the right can be referenced during the conversation. ' +
    'Just type a # and then type some keywords to search over them.',
  'Also, you can select text in the conversation and right-click to add a ' +
    'new factor.'
];
var demoFactors = [
  'My finger hurts',
  'I\'m no good at cooking',
  'My toe hurts',
  'Burnt mouth on pizza'
];

demoMessages.map(chatActions.sendMessage);
demoFactors.map(factorActions.addFactor);
