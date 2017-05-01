//Next Song Event
const { EventEmitter } = require('events')
module.exports = new EventEmitter()


//GuildPlayer Registry
module.exports.Registry = require('./lib/Registry')


//Utilites
module.exports.linkType = require('./lib/linkType')

module.exports.apiCheck = require('./lib/apiKeyCheck')