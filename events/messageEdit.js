const bot = require('../bot.js')
const Adblock = require('../functions/adblock')
const Message = require('../struct/Message')
const Filter = require('../functions/filter')

bot.on('messageUpdate', (oldMessage, message) => {

    if (oldMessage.content === message.content) return 

    message = Message(message)

    Adblock(message)
    
    Filter(message)

})