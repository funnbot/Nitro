const bot = require('../bot.js')
const Message = require('../struct/Message')
const perm = require('../functions/checkPerm.js')
const cmds = require('../functions/loadCommands.js').getCmds()
const help = require('../commands/help.js')
const CustomCmds = require('../commands/ccmd')
const Adblock = require('../functions/adblock')

bot.on('message', (message) => {

  //Extend Message
  message = Message(message)

  //Adblock
  Adblock(message)

  if (message.author.bot) return;

  //let blocked = config.getBlocked();
  //if (blocked.users[message.author.id]) return;
  //if (message.channel.type === "text" && blocked.servers[message.guild.id]) return;

  //stat
  let lvl = bot.profile.getLvl(message.author.id);
  bot.profile.addMsg(message.author.id);
  let newlvl = bot.profile.getLvl(message.author.id);
  if (lvl !== newlvl && message.channel.type === "text") {
    let level = message.guild.level
    if (level) {
      message.channel.sendMessage("**:arrow_double_up: | " + message.author.username + " leveled up to level " + newlvl + "**")
    }
  }
  if (message.content.startsWith('<@264087705124601856>') || message.content.startsWith('<@!264087705124601856>')) {
    if (!message.args[1]) return;
    if (message.args[1] === "prefix") return message.channel.sendMessage("**My prefix is " + message.guild.prefix + "**");
    if (message.args[1] === "help") cmds.help.run(message, bot);
  }
  if (!message.content.startsWith(message.guild.prefix)) return;

  //Custom Commands
  if (message.channel.type === "text") {
    let custom = message.guild.custom
    if (!!custom[message.command] && !cmds.hasOwnProperty(message.command)) {
      if (message.guild.perms[message.command]) {

        let customPerms = []
        Object.keys(message.guild.perms[message.command]).forEach(p => {
          if (message.guild.perms[message.command][p] === "add") customPerms.push(p)
        })

        let Ccheck = perm.Mcheck(customPerms, message)
        if (!Ccheck.has) return message.channel.sendMessage("Uh Oh, I was unable to proceed because you lack the permission(s) `" + Ccheck.miss.join(", ") + "`")

      }

      CustomCmds.convert(message.command, message, bot)
    }
  }

  if (!cmds.hasOwnProperty(message.command)) return;
  //if (suffix.includes("<") && suffix.includes(">")) message.channel.sendMessage("*It looks like you are using the characters < and > in your command. Remember, these are only for refrence on what type of text goes there, not to actually include them.*")
  if (message.channel.type !== "text" && cmds[message.command].conf.dm === false) return message.channel.sendMessage('This command does not work in Direct Messages.');
  let stop = false
  if (message.channel.type === "text") {
    //Modules
    let mods = message.guild.modules
    let categ = cmds[message.command].conf.category;
    if (categ === "Fun" && !!mods.fun) return;
    if (categ === "Music" && !!mods.music) return;
    if (categ === "Social" && !!mods.social) return;

    let newRoles = cmds[message.command].conf.userPerm.slice(0)

    if (message.guild.perms[message.command]) {

      Object.keys(message.guild.perms[message.command]).forEach(p => {
        if (message.guild.perms[message.command][p] === "add") newRoles.push(p)
      })

    }

    console.log(newRoles)

    let Mcheck = perm.Mcheck(newRoles, message);
    let cantGo = false;
    if (!Mcheck.has) {
      cantGo = true;
      message.channel.sendMessage("Uh Oh, I was unable to proceed because you lack the permission(s) `" + Mcheck.miss.join(", ") + "`")
    }
    if (cantGo) return stop = true;
    let Bcheck = perm.Bcheck(cmds[message.command].conf.botPerm, message);
    if (!Bcheck.has) {
      cantGo = true;
      message.channel.sendMessage("Uh Oh, I was unable to proceed because I (the bot) lack the permission(s) `" + Bcheck.miss.join(", ") + "`")
    }
    if (cantGo) return stop = true;
  } else {
    let noGo = false;
    let perms = cmds[message.command].conf.userPerm;
    perms.forEach(p => {
      if (p.toLowerCase() === "dev") {
        if (message.author.id !== "163735744995655680") {
          noGo = true
        }
      }
    })
    if (noGo) return stop = true;
  }
  if (stop) return;
  try {
    cmds[message.command].run(message, bot, message.channel.send.bind(message.channel))
  } catch (err) {
    console.log(err);
  }
})