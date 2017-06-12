exports.run = (message, bot) => {
  let embed = new bot.embed()
  let a = "[Click Me!](https://nitro.ws/)"
  let b = "[Click Me!](https://discordapp.com/oauth2/authorize?client_id=264087705124601856&scope=bot&permissions=268435510)"
  let c = "[Click Me!](https://github.com/funnbot/Nitro)"
  let d = "[Click Me!](https://trello.com/b/1xFxc2oG/nitro-discord-bot)"
  let e = "[Click Me!](https://www.patreon.com/user?u=4661783)"
  let f = "[Click Me!](https://discord.gg/aZ2PYhn)"
  let g = "[Click Me!](https://docs.google.com/spreadsheets/d/1Hpnkiej8l3opTgH15SqY-erZOwHF9p007nHURSGiJvc/edit#gid=0)"
  let h = "[Click Me!](https://docs.google.com/forms/d/e/1FAIpQLSe464Z32WS3AvO-LOs_tedmkRprTUNH-gvcIhB-w5wY43yLHA/viewform?usp=sf_link)"
  embed.setColor("#adff2f")
  embed.setAuthor("Nitro's Links", bot.user.avatarURL)
  embed.addField("Website", a, true)
  embed.addField("Invite", b, true)
  embed.addField("Github", c, true)
  embed.addField("Trello", d, true)
  embed.addField("Patreon", e, true)
  embed.addField("Support Server", f, true)
  embed.addField("Commands and Suggestions", g, true)
  embed.addField("Suggest a Command", h, true)
  message.channel.send("", {embed})
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"A collections of links",
  args:"",
}