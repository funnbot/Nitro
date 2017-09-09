console.log("Blooping...")
let start = (new Date()).getTime()

const Discord = require('discord.js')

const loadDB = require('../functions/loadDB')

const GuildConfig = require('../struct/GuildConfig')

const ProfileConfig  = require('../struct/ProfileConfig')

const SystemConfig = require('../struct/SystemConfig')

const Framework = require('../functions/framework')

const Bot = () => {

    return new Promise((resolve, reject) => {

        loadDB().then((data) => {

            let bot = new Discord.Client({

                disabledEvents: ['TYPING_START'],
                messageCacheMaxSize: 150,
                messageCacheLifetime: 3600

            })

            bot.config = new GuildConfig(data)

            bot.profile = new ProfileConfig(data)

            bot.system = new SystemConfig(data)

            bot.embed = Discord.RichEmbed

            bot.on('ready', () => {

                console.log("Bloop took: " + ((new Date).getTime() - start) + "MS")
                Framework.start(bot)

                if (bot.shard) {

                    console.log("Shard #"+bot.shard.id+" active with "+bot.guilds.size+" guilds")
                    bot.user.setPresence({ game: { name: "@Nitro help | Shard " + (bot.shard.id + 1) + "/" + bot.shard.count, type: 0 } })
                } else {
                    console.log("Shard #0 active with "+bot.guilds.size+" guilds")
                    bot.user.setPresence({ game: { name: "@Nitro help | "+bot.guilds.size+" guilds", type: 0 } })
                }

            })

            return resolve(bot);

        }).catch(err => reject(err))

    })

}

module.exports = Bot;
