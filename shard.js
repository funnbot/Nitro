const config = require('./config.js')
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');
Manager.spawn(config.shard);