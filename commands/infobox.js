const profile = require('../functions/profile');

exports.run = (message, bot, suffix, args, send) => {
    if (!args[0]) return send("**Provide the message to be set as your info box**");
    if (suffix.length > 120) return send("**Your info box message must be less than 120 characters.**");
    profile.setShout(message.author.id, suffix);
    send("**Your info box message was set to: **\n"+suffix)
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Social",
  help:"Set the info box message on your profile.",
  args:"",
}