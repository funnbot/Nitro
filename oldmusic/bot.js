const auth = require('../config.js');
const Discord = require('discord.js');
const bot = new Discord.Client({
  disabledEvents: ["TYPING_START"],
  messageCacheMaxSize: 50,
  disableEveryone: true
});
module.exports.bot = bot;
require('./functions/loadCommands').load();
require('./functions/config')
require('./events/message.js');
require('./events/disconnect.js')

bot.on('ready', () => {
  console.log("Music started on shard #" + bot.shard.id)
})

bot.login(auth.token);