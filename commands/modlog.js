exports.run = (message, bot, send) => {
    send("**To set a channel as Nitro's modlog, change its Topic to *exactly*: `nitro-modlog` **")
}

exports.conf = {
  userPerm:["MANAGE_GUILD"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Utility",
  help:"Set Nitro's modlog",
  args:"",
}