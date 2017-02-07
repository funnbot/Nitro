const config = require('../functions/config.js');

exports.run = (message, bot, suffix, args) => {
   if (!args[0]) return message.channel.sendMessage("**[ Tag Help]**\nTo retrieve a tag use:\n`n!tag <tagName>`\nTo add a tag use:\n`n!tag add <tagName> <the text for this tag>`\nTo remove a tag use:\n`n!tag delete <tagName>`\nTo list all tags use:\n`n!tags`");
   let tags = config.getTags(message.guild.id);
   let prefix = config.getPrefix(message.guild.id);
   if (args[0] === "add") {
      if (!args[1]) return message.channel.sendMessage(`To add a tag use:\n\`${prefix}tag add <name> <the tags text>\``);
      if (tags[args[1]]) return message.channel.sendMessage("**The tag `"+args[1]+"` already exists**");
      if (!args[2]) return message.channel.sendMessage(`Provide the text for the tag after the name.`);
      let r = suffix.split(" ");
      r.shift();
      r.shift();
      let text = r.join(" ");
      tags[args[1]] =  {owner:message.author.id, text:text};
      message.channel.sendMessage("**Adding the tag `"+args[1]+"`**.")
      return config.setTags(message.guild.id, tags)
   } else if (args[0] === "delete") {
      if (!args[1]) return message.channel.sendMessage(`To delete a tag use:\n\`${prefix}tag delete <tagname>\``);
      if (!tags[args[1]]) return message.channel.sendMessage("**The tag `"+args[1]+"` does not exist.**");
      let tag = tags[args[1]];
      if (message.author.id === tag.owner || message.channel.permissionsFor(message.member).hasPermission("MANAGE_GUILD")) {
        delete tags[args[1]];
        return message.channel.sendMessage("**The tag `"+args[1]+"` has been deleted**");
      } else {
        return message.channel.sendMessage("**Only the owner of this tag or a user with the permission `MANAGE_GUILD` can delete it.** ")
      }
   } else {
      if (tags[args[0]]) {
        message.channel.sendMessage(tags[args[0]].text);
      } else {
        message.channel.sendMessage("**The tag `"+args[0]+"` does not exist.**")
      }
   }
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:false,
  category:"Utility",
  help:"Get a tag or edit current tags.",
  args:"",
}