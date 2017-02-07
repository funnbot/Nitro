const profile = require('../functions/profile');
const bg = require('../functions/bg');

exports.run = (message, bot, suffix, args, send) => {
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {time:360000})
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