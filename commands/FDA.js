exports.run = (message, bot, send) => {
  let embed = new bot.embed()
  embed.setDescription("**[YouTuber // Active Virtual Addiction Member // Crionic Owner]()**")
  embed.setColor("#790505")
  send("", {embed})
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Donator",
  help:"Bio for FDA.",
  args:"",
}
