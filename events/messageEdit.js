const bot = require('../bot.js')
const Adblock = require('../functions/adblock')
const Message = require('../struct/Message')

bot.on('messageUpdate', (oldMessage, message) => {

    if (oldMessage.content === message.content) return 

    message = Message(message)

    Adblock(message)

})