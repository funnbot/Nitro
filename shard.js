const config = require('./config.js')
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js', {totalShards: "auto", token: config.token});
Manager.spawn();