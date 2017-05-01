exports.run = (message, bot, send) => {
  send("Is the bot offline on your server? Go Here => discord.gg/aZ2PYhn and get updates on when it will come back.")
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Is the bot offline on your server? Use this command.",
  args:"",
}