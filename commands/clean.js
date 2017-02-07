exports.run = (message, bot, suffix, args, send) => {
    let num = (!!args[0]) ? parseInt(args[0]) || 20 : 20;
    console.log(num)
    message.channel.fetchMessages({limit:num}).then(msgs => {
      let ms = msgs.filter(m => m.author.id === bot.user.id);
      message.channel.bulkDelete(ms).then(() => send("**Cleaning up Nitro's messages**"))
    })
}

exports.conf = {
  userPerm:["MANAGE_MESSAGES"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm: true,
  category:"Utilty",
  help:"Clean messages sent by Nitro",
  args:"",
}