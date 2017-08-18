exports.run = (message, bot) => {
    bot.guilds.forEach(g => {

      if (g.id !== "110373943822540800" && g.id !== "267855028914618369") {

        let text = "Nitro has gone through a Major Rewrite, including his Database.\nThis means that the prefix was reset to `n!` and all other settings aswell.\nBesides this, downtimes should become non-existant, and new features are on their way."

        //g.defaultChannel.send(text)

      }

    })
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Broadcast to all the servers",
  args:"",
}