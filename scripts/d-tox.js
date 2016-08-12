// Description
//   hubot scripts for d-tecting toxicity
//
// Commands:
//   hubot activate d-tox - res w/ activate msg if user is nash
//   hubot d-tox [number of messages to recall up to 10]
//
//
//
// Author:
//   Nash <wtnash538@gmail.com>

var immutable = require('immutable');
var _ = require('lodash');

var Map = immutable.Map;
var Stack = immutable.Stack;

module.exports = function(robot) {

  var dMessages = Map();

  robot.respond(/activate d-tox$/i, function(res) {
    if (res.message.user.name.toLowerCase() == "nash") {
      return res.send("Activating d-tox")
    }

    return res.reply("I'm afraid I can't let you do that")
  });

  robot.hear(/.*/i, function (message) {
    if (
      message.message.user.name.toLowerCase() == "d" ||
      message.message.user.name.toLowerCase() == "shell"
    ) {
      var channel = message.message.room
      var channelStack = dMessages.get(channel);
      if (!channelStack) {
        channelStack = Stack();
      }
      channelStack = channelStack.push(message.message);
      dMessages = dMessages.set(channel, channelStack);
    }
  });

  robot.respond(/d-tox (\d*)/, function (message) {
    if (message.message.user.name.toLowerCase() == "d") {
      return message.reply("I dont speak italian")
    }

    var popCount = _.toNumber(message.match[1]);
    if (_.isInteger(popCount) !== true) {
      return message.reply("Must be an integer");
    }

    if (popCount > 10){
      return message.reply("10 is the d-tox max")
    }

    var channel = message.message.room;
    var channelStack = dMessages.get(channel);

    if (!channelStack || !channelStack.peek()) {
      return message.reply("I got nothing")
    }

    var output = "";

    while (popCount !== 0) {
      var currentMessage = channelStack.peek();
      if (currentMessage) {
        output += "> d: " + currentMessage.text + "\n"
        channelStack = channelStack.pop();
      }
      popCount -= 1;
    }

    message.reply(output);

  })
}
