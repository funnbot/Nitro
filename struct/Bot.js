const Discord = require('discord.js')

const loadDB = require('../functions/loadDB')

const GuildConfig = require('../struct/GuildConfig')

const ProfileConfig  = require('../struct/ProfileConfig')

const Bot = () => {

    return new Promise((resolve, reject) => {

        loadDB().then((data) => {

            let bot = new Discord.Client({

                disabledEvents: ['TYPING_START'],
                fetchAllMembers: true
                
            })

            bot.config = new GuildConfig(data)

            bot.profile = new ProfileConfig(data)

            bot.embed = Discord.RichEmbed

            bot.on('ready', () => {
                if (bot.shard) {
                    console.log("Shard #"+bot.shard.id+" active with "+bot.guilds.size+" guilds")
                } else {
                    console.log("Shard #0 active with "+bot.guilds.size+" guilds")
                }
                
            })

            return resolve(bot);

        }).catch(err => reject(err))

    })

}

module.exports = Bot;