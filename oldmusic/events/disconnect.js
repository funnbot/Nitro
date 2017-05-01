const bot = require('../bot.js').bot
const config = require('../../config.js')

bot.on('disconnect', () => {

    setTimeout(() => {

        bot.destroy().then(() => {

            bot.login(config.token).catch(console.log)

            bot.channels.get('285272572806037514').sendMessage("Bot disconnected, Attempting reconnect.")

        })

    }, 2000)



})