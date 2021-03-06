# Description
#   hubot scripts for diagnosing hubot
#
# Commands:
#   hubot ping - Reply with pong
#   hubot adapter - Reply with the adapter
#   hubot echo <text> - Reply back with <text> only if you're nash
#   hubot time - Reply with current time
#
# Author:
#   Josh Nichols <technicalpickles@github.com>

module.exports = (robot) ->
  robot.respond /PING$/i, (msg) ->
    msg.send "PONG"

  robot.respond /ADAPTER$/i, (msg) ->
    msg.send robot.adapterName

  robot.respond /ECHO (.*)$/i, (res) ->
    if res.message.user.name.toLowerCase() == "nash"
        echo = res.match[1]
        res.send echo
    else
        res.reply "I'm afraid I can't let you do that"

  robot.respond /TIME$/i, (msg) ->
    msg.send "Server time is: #{new Date()}"
