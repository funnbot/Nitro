const bot = require('../bot.js').bot;
const perm = require('../functions/checkPerm.js');
const config = require('../functions/config.js');
const cmds = require('../functions/loadCommands.js').getCmds();
const help = require('../commands/help.js');
const profile = require('../functions/profile');
const CustomCmds = require('../commands/ccmd');

bot.on('message', (message) => {
  //Adblock
  if (message.channel.type === "text") {
    let ad = config.getAd(message.guild.id);
    if (!!ad.on) {
      if (!ad.ex || !ad.ex.users || !ad.ex.users[message.author.id]) {
        if (message.content.includes("discord.gg/")) {
          let roles = (!!ad.ex && !!ad.ex.roles) ? Object.keys(ad.ex.roles) : [];
          let notEx = true;
          if (roles.length > 0) {
            roles.forEach(r => {
              if (message.member.roles.has(r)) {
                notEx = false;
              }
            })
          }
          if (notEx) {
            if (message.author.id !== message.guild.owner.user.id) {
              message.delete();
              tro.error(message, "**AdBlock**: " + message.author + ", Please Do Not Advertise.", 10000)
              if (!!ad.notify) {
                bot.users.get(message.guild.owner.id).sendMessage("*The user:* **" + message.author.username + "** *Has Advertised in the channel:* **" + message.channel.name + "** *of the server* **" + message.guild.name + "** *With the message:* \n`" + message.content + "`")
              }
            }
          }
        }
      }
    }
  }
  tro.log(message)
  if (message.author.bot) return;
  let prefix;
  if (message.channel.type === "text") {
    prefix = config.getPrefix(message.guild.id);
  } else {
    prefix = "n!"
  }
  let blocked = config.getBlocked();
  if (blocked.users[message.author.id]) return;
  if (message.channel.type === "text" && blocked.servers[message.guild.id]) return;
  //stat
  let lvl = profile.getLvl(message.author.id);
  profile.addMsg(message.author.id);
  let newlvl = profile.getLvl(message.author.id);
  if (lvl !== newlvl && message.channel.type === "text") {
    let level = config.getLevel(message.guild.id);
    if (level) {
      message.channel.sendMessage("**:arrow_double_up: | " + message.author.username + " leveled up to level " + newlvl + "**")
    }
  }
  let nopre = message.content.slice(prefix.length);
  let args = nopre.split(" ");
  if (message.content.startsWith('<@264087705124601856>') || message.content.startsWith('<@!264087705124601856>')) {
    if (!args[1]) return;
    if (args[1] === "prefix") return message.channel.sendMessage("**My prefix is " + prefix + "**");
    if (args[1] === "help") cmds.help.run(message, bot);
  }
  if (!message.content.startsWith(prefix)) return;
  let command = args[0];
  args.shift();
  let suffix = args.join(" ");
  //Custom Commands
  if (message.channel.type === "text") {
    let custom = config.getCustom(message.guild.id);
    if (!!custom[command] && !cmds.hasOwnProperty(command)) {
      CustomCmds.convert(command, message, bot)
    }
  }

  if (!cmds.hasOwnProperty(command)) return;
  //if (suffix.includes("<") && suffix.includes(">")) message.channel.sendMessage("*It looks like you are using the characters < and > in your command. Remember, these are only for refrence on what type of text goes there, not to actually include them.*")
  if (message.channel.type !== "text" && cmds[command].conf.dm === false) return message.channel.sendMessage('This command does not work in Direct Messages.');
  let stop = false
  if (message.channel.type === "text") {
    //Modules
    let mods = config.getMod(message.guild.id);
    let categ = cmds[command].conf.category;
    if (categ === "Fun" && !!mods.fun) return;
    if (categ === "Music" && !!mods.music) return;
    if (categ === "Social" && !!mods.social) return;
    let Mcheck = perm.Mcheck(cmds[command].conf.userPerm, message);
    let cantGo = false;
    if (!Mcheck.has) {
      cantGo = true;
      message.channel.sendMessage("Uh Oh, I was unable to proceed because you lack the permission(s) `" + Mcheck.miss.join(", ") + "`")
    }
    if (cantGo) return stop = true;
    let Bcheck = perm.Bcheck(cmds[command].conf.botPerm, message);
    if (!Bcheck.has) {
      cantGo = true;
      message.channel.sendMessage("Uh Oh, I was unable to proceed because I (the bot) lack the permission(s) `" + Bcheck.miss.join(", ") + "`")
    }
    if (cantGo) return stop = true;
  } else {
    let noGo = false;
    let perms = cmds[command].conf.userPerm;
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
    cmds[command].run(message, bot, suffix, args, message.channel.send.bind(message.channel))
  } catch (err) {
    console.log(err);
  }
})