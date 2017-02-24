const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');
const Music = new Discord.ShardingManager('./music/bot.js')
Manager.spawn(1);
Music.spawn(1)