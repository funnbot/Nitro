const config = require('../functions/config.js');
const bot = require('../bot.js').bot;
const cmds = require('../functions/loadCommands.js').getCmds();

bot.on('message', (message) => {
    if (message.author.bot) return;
  let prefix;
  if (message.channel.type === "text") {
    prefix = config.getPrefix(message.guild.id);
  } else { 
    prefix = "n!"
  }
  let nopre = message.content.slice(prefix.length);
  let args = nopre.split(" ");
  if (!message.content.startsWith(prefix)) return;
  let command = args[0];
  args.shift();
  let suffix = args.join(" ");
  if (!cmds.hasOwnProperty(command)) return;
  try {
    cmds[command].run(message, bot, suffix, args, message.channel.send.bind(message.channel))
  } catch (err) {
    console.log(err);
  }
})