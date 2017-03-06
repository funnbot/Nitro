const bg = require('../functions/bg');

exports.run = (message, bot, send) => {
    
  if (!message.args[0]) return send("**The available backrounds are: `default`**")

}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Social",
  help:"Set the background fosr your profile [WIP]",
  args:"",
}