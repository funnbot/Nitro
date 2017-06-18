exports.run = (message, bot, send) => {
    let num = (!!message.args[0]) ? parseInt(message.args[0]) || 20 : 20;
    message.channel.fetchMessages({limit:num}).then(msgs => {
      let ms = msgs.filter(m => m.author.id === bot.user.id);
      if (ms.size === 1) { ms.first().delete(); return send("**Cleaning up Nitro's messages**") }
      if (ms.size < 1) return send("**No messages found to clean**")
      message.channel.bulkDelete(ms, true).then(() => send("**Cleaning up Nitro's messages**"))
    })
}

exports.conf = {
  userPerm:["MANAGE_MESSAGES"],
  botPerm:["SEND_MESSAGES", "MANAGE_MESSAGES"],
  coolDown:0,
  dm: false,
  category:"Utility",
  help:"Clean messages sent by Nitro",
  args:"",
}