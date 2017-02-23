const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
  let split = message.content.split("\"");
  let bool = message.content.replace(/"/g, "");
  if (bool.length === message.content.length-1) {
    bool = false;
  } else {
    bool = true
  }
  if (!split[1] || !bool) {
    return message.channel.sendMessage("Looks like you didnt format setting the prefix correctly,\nThe proper way is: `"+config.getPrefix(message.guild.id)+"setprefix \"newPrefix\"`\n*example: to set the prefix to `nitro, ` use,*\n`"+config.getPrefix(message.guild.id)+"setprefix \"nitro, \"`");
  }
  if (split[1].length > 20) return message.channel.sendMessage("Your prefix can't be longer than 18 characters.")
  console.log(split[1])
  if (split[1] == " ") return message.channel.sendMessage("The prefix can not be ` `")
  config.setPrefix(message.guild.id, split[1]);
  message.channel.sendMessage("The prefix for this server has been changed to `"+config.getPrefix(message.guild.id)+"`")
}
  
exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Utility",
  help:"Set Nitro's prefix. Write the new prefix inside \" \"",
  args:"\"<newPrefix>\""
}
