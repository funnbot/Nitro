const Bot = require('./struct/Bot')

Bot().then(bot => {
    module.exports = bot
    require('./events/message')
    require('./events/messageEdit')
    require('./events/guildCreate+Delete')
    require('./events/guildMemberAdd')
    require('./events/guildMemberRemove')
    require('./events/modlog')
    require('./functions/loadCommands').load()
    require('./util')
    require('./functions/specialHelp')
    bot.login(config.token)
}).catch(err => console.log(err));

client.login(TOKEN);
