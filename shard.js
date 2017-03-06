const config = require('./config.js')

const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');
const Music = new Discord.ShardingManager('./music/bot.js')
Manager.spawn(config.shard);
Music.spawn(config.shard)