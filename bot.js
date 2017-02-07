console.log("Booting Up");
let start = (new Date).getTime();

const Discord = require('discord.js');
let bot = new Discord.Client({
  disabledEvents: ["TYPING_START"],
  messageCacheMaxSize: 100,
  fetchAllMembers: true
});
module.exports.bot = bot;
const auth = require('./auth.js');
const perm = require('./functions/checkPerm.js');
require('./events/message.js');
require('./util.js');
require('./functions/specialHelp');
require('./events/guildMemberAdd');
require('./events/guildMemberRemove');
require('./events/guildCreate+Delete.js');
require('./functions/bg.js');
require('./functions/loadCommands').load();
require('./functions/config.js').load();
require('./functions/profile.js').load()
bot.on('ready', () => {
  let date = (new Date).getTime();
  let boot = date - start;
  console.log("Boot took: " + boot + "MS")
  console.log("Bot Is Active.");
  const games = [`With ${bot.users.size} Users`, `In ${bot.guilds.size} Servers`, `With your heart`, `99 bottles of beer`, 'Who let the dogs out?'];
  let cycle = 0;
  setInterval(function () {
    bot.user.setGame(games[cycle]);
    cycle++
    if (cycle > games.length - 1) cycle = 0;
  }, 240000);
});

bot.login(auth.auth.token);