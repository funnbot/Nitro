const math = require('mathjs');

exports.run = (message, bot, suffix, args) => {
    let repo;
    try {
      repo = math.eval(suffix);
    } catch(err) {
      repo = err
    }
    message.channel.sendMessage("**Input**\n```js\n"+suffix+"```\n**Output**\n```js\n"+repo+"```")
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Fun",
  help:"Do some math.",
  args:"",
}