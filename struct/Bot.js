console.log("Blooping...")
let start = (new Date()).getTime()

const Discord = require('discord.js')

const loadDB = require('../functions/loadDB')

const GuildConfig = require('../struct/GuildConfig')

const ProfileConfig  = require('../struct/ProfileConfig')

const SystemConfig = require('../struct/SystemConfig')

const Framework = require('../functions/framework')(Discord)

const Bot = () => {

    return new Promise((resolve, reject) => {

        loadDB().then((data) => {

            let bot = new Discord.Client({

                disabledEvents: ['TYPING_START'],
                fetchAllMembers: true
                
            })

            bot.config = new GuildConfig(data)

            bot.profile = new ProfileConfig(data)

            bot.system = new SystemConfig(data)

            bot.embed = Discord.RichEmbed

            bot.on('ready', () => {

                console.log("Bloop took: " + ((new Date).getTime() - start) + "MS")

                if (bot.shard) {
                    
                    console.log("Shard #"+bot.shard.id+" active with "+bot.guilds.size+" guilds")
                    bot.user.setGame("@Nitro help | Shard " + (bot.shard.id + 1) + "/" + bot.shard.count)
                } else {
                    console.log("Shard #0 active with "+bot.guilds.size+" guilds")
                    bot.user.setGame("@Nitro help | "+bot.guilds.size+" guilds")
                }
                
            })

            return resolve(bot);

        }).catch(err => reject(err))

    })

}

module.exports = Bot;