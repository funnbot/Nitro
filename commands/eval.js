const util = require('util');

exports.run = (message, bot, suffix, args) => {
  try {
   let toeval = util.inspect(eval(suffix))
   if (toeval.length > 1900) {
    toeval = toeval.substr(0, 1900);
   }
   message.channel.sendMessage("**Input**\n" + suffix + "\n\n**Output**\n```js\n" + toeval + "```")
    .then(m => m.delete(20000)).catch(console.log);
  } catch (err) {
    console.log(err)
   message.channel.sendMessage("**```prolog\nError:\n\n" + err + "```**")
    .then(m => m.delete(20000)).catch(console.log);
  }
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Eval a bit o code",
  args:"<code>"
}
