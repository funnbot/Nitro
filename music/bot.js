const Eris = require('eris')
const config = require('../config.js')

const bot = new Eris(config.token, {maxShards: 5, messageLimit: 10})

const music = require('./node-music')
bot.music = music
bot.music.registry = new music.Registry()

module.exports = bot
require('./func/config')
require('./func/loadCommands').load()
require('./events/message')
require('../util')

bot.on('ready', () => {
    console.log("Music Module Ready On "+bot.shards.size+" Shards")
})

bot.connect()