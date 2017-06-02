exports.run = (message, bot) => {
  let split = message.content.split("\"");
  let bool = message.content.replace(/"/g, "");
  if (bool.length === message.content.length-1) {
    bool = false;
  } else {
    bool = true
  }
  if (!split[1] || !bool) {
    return message.channel.send("Looks like you didnt format setting the prefix correctly,\nThe proper way is: `"+message.guild.prefix+"setprefix \"newPrefix\"`\n*example: to set the prefix to `nitro, ` use,*\n`"+message.guild.prefix+"setprefix \"nitro, \"`");
  }
  if (split[1].length > 20) return message.channel.send("**Invalid Prefix**: Too Long")

  if (/^\s+$/g.test(split[1])) return message.channel.send("**Invalid Prefix**: Illegal Characters")
  bot.config.setPrefix(message.guild.id, split[1]);
  message.channel.send("**The prefix for this server has been changed to '"+bot.config.getPrefix(message.guild.id)+"'**")
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
