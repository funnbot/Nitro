const Commands = require('../functions/loadCommands.js');

exports.run = (message, bot, send) => {
  let cmds = Commands.getCmds()
  let mods = message.guild.modules
  console.log(mods)
  let prefix = message.guild.prefix
  let temp = {}
  let fields = []
  forEach(cmds, (c, k) => {
    if (c.conf.category !== "DevOnly" && !mods[c.conf.category.toLowerCase()]) {
      if (!temp.hasOwnProperty(c.conf.category)) temp[c.conf.category] = []
      temp[c.conf.category].push("• " + prefix + k + " - " + c.conf.help)
    }
  })
  forEach(temp, (c, k) => {
    fields.push({
      name: k,
      value: c.join('\n'),
      inline: true
    })
  })
  let embed = {
    description: "The prefix for your server is: " + prefix + "\n[Invite](https://discordapp.com/oauth2/authorize?client_id=264087705124601856&scope=bot&permissions=268435510) | [Support](https://discord.gg/aZ2PYhn) | [Patreon](https://patreon.com/user?u=4661783) | [Github](https://github.com/funnbot/Nitro)",
    fields,
    color: 0x155CA8
  }
  if (message.channel.type === "text") message.channel.send("**Sliding Into Your DM's**").then(m => m.delete(3000))
  message.author.send('', {
    embed
  })
}

exports.conf = {
  userPerm: [],
  botPerm: [],
  dm: true,
  coolDown: 100,
  category: "Other",
  help: "Get a list of Nitro's commands.",
  args: ""
}

let forEach = function (obj, loop) {
  let a = Object.keys(obj)
  for (i = 0; i < a.length; i++) {
    loop(obj[a[i]], a[i])
  }
  return
}