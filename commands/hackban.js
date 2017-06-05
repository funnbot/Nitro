exports.run = (message, bot) => {
    if (!message.args[0]) return message.channel.send("Ban a user by their ID. Use for people who are not currently in your server.");
    message.guild.ban(message.args[0]).then(() => {
        message.channel.send("Banning the ID `"+message.args[0]+"`")
    }).catch(err => {
        message.channel.send("The ID `"+message.args[0]+"` is not a valid user.");
    })
}

exports.conf = {
  userPerm:["BAN_MEMBERS"],
  botPerm:["SEND_MESSAGES", "BAN_MEMBERS"],
  coolDown:0,
  dm:true,
  category:"Moderation",
  help:"Ban a user by their ID, even if they haven't joined your server.",
  args:"<id>",
}