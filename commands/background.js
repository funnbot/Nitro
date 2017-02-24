const profile = require('../functions/profile');
const bg = require('../functions/bg');

exports.run = (message, bot, suffix, args, send) => {
    
  if (!args[0]) return send("**The available backrounds are: `default`**")

}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Social",
  help:"Set the background for your profile [WIP]",
  args:"",
}