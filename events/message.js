const bot = require('../bot.js')
const Message = require('../struct/Message')
const perm = require('../functions/checkPerm.js')
const cmds = require('../functions/loadCommands.js').getCmds()
const help = require('../commands/help.js')
const CustomCmds = require('../commands/ccmd')
const Adblock = require('../functions/adblock')
const Filter = require('../functions/filter')
const log = require('../functions/log')
/*const Mixpanel = require('mixpanel');
let mixpanel = Mixpanel.init("a4cd26822d32fdde282a60cb28c31253")*/

function handleError(e) {
    let a = 0;
    return a;
}

bot.on('message', (message) => {

  //Extend Message
  message = Message(message)

  //Adblock
  Adblock(message)

  //Filter
  Filter(message)

  if (message.author.bot) return;

  let blocked = bot.system.getBlocked()
  if (blocked[message.author.id]) return
  if (message.channel.type === 'text' && blocked[message.guild.id]) return

  //stat
  let lvl = bot.profile.getLvl(message.author.id);
  bot.profile.addMsg(message.author.id);
  let newlvl = bot.profile.getLvl(message.author.id);
  if (lvl !== newlvl && message.channel.type === "text") {
    let level = message.guild.level
    if (level) {
      message.channel.send("**:arrow_double_up: | " + message.author.username + " leveled up to level " + newlvl + "**")
    }
  }
  if (message.content.startsWith('<@264087705124601856>') || message.content.startsWith('<@!264087705124601856>')) {
    if (!message.args[0]) return;
    if (message.args[0] === "prefix") return message.channel.send("**My prefix is " + message.guild.prefix + "**");
    if (message.args[0] === "help") cmds.help.run(message, bot);
  }

  if (!message.content.startsWith(message.guild.prefix)) return;

  if (message.channel.type === "text" && !message.channel.permissionsFor(message.guild.member(bot.user)).has("SEND_MESSAGES")) return message.author.send("**I lack the permission to send messages in this channel.**").catch(e => handleError(e))

  //Custom Commands
  if (message.channel.type === "text") {
    let custom = message.guild.custom
    if (!!custom[message.command] && !cmds.hasOwnProperty(message.command)) {
      if (message.guild.perms[message.command]) {

        let customPerms = []
        Object.keys(message.guild.perms[message.command]).forEach(p => {
          if (message.guild.perms[message.command][p] === "add") customPerms.push(p)
          if (message.guild.perms[message.command][p] === "delete") customPerms.splice(customPerms.indexOf(p), 1)
        })

        let Ccheck = perm.Mcheck(customPerms, message)
        if (!Ccheck.has) return message.channel.send("Uh Oh, I was unable to proceed because you lack the permission(s) `" + Ccheck.miss.join(", ") + "`")

      }

      //delete command
      let delcc = message.guild.deletem
      if (delcc) message.delete()

      if (custom[message.command].type === "shortcut") {
        let saved = message.args.slice(0)
        let cmsg = custom[message.command].msg
        let split = cmsg.split(" ")
        message.command = split[0]
        split = split.slice(1)
        split.forEach((s, i) => {
          message.args[i] = s
        })
        saved.forEach((s, i) => {
          message.args[(i + message.args.length)] = s
        })
        //console.log(split)
      } else CustomCmds.convert(message.command, message, bot)
    }
  }
  if (!cmds.hasOwnProperty(message.command)) return;

  //delete command
  let del = message.guild.deletem
  if (del) message.delete()

  //log
  if (message.channel.type === "dm") log.dm(message)
  else log.g(message)
  /*mixpanel.track(message.command, {
    b: 5
  })*/

  //if (suffix.includes("<") && suffix.includes(">")) message.channel.send("*It looks like you are using the characters < and > in your command. Remember, these are only for refrence on what type of text goes there, not to actually include them.*")
  if (message.channel.type !== "text" && cmds[message.command].conf.dm === false) return message.channel.send('This command does not work in Direct Messages.');
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
        if (message.guild.perms[message.command][p] === "delete") newRoles.splice(newRoles.indexOf(p), 1)
      })

    }

    let Mcheck = perm.Mcheck(newRoles, message);
    let cantGo = false;
    if (!Mcheck.has) {
      cantGo = true;
      message.channel.send("Uh Oh, I was unable to proceed because you lack the permission(s) `" + Mcheck.miss.join(", ") + "`")
    }
    if (cantGo) return stop = true;
    let Bcheck = perm.Bcheck(cmds[message.command].conf.botPerm, message);
    if (!Bcheck.has) {
      cantGo = true;
      message.channel.send("Uh Oh, I was unable to proceed because I (the bot) lack the permission(s) `" + Bcheck.miss.join(", ") + "`")
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