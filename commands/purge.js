exports.run = (message, bot) => {
  let embed = new bot.embed()
  embed.addField(message.guild.prefix + "purge <int>", "Purge <int> messages. If NaN defaults to 20. Discords API makes it impossible to delete messages older than 14 days.")
  embed.addField(message.guild.prefix + "purge <int> <@mentions...>", "Purge <int> messages but filter by mentioned users. If no number provided defaults to 20.")
  embed.addField(message.guild.prefix + "purge <int> -b", "Use the `-b` flag to only purge messages sent by bots.")
  embed.addField(message.guild.prefix + "purge search <query>", "Search through the past 100 messages and purge those containing <query>")
  if (!message.args[0]) return message.send({
    embed
  })

  if (message.args[0] === "search") return purgeSearch(message, bot)
  else return purge(message, bot)
}

function purgeSearch(message, bot) {

    let query = message.args.slice(1).join(" ")

    message.channel.sendMessage("`Collecting...`").then(top => {

        message.channel.fetchMessages({limit:100}).then(msgs => {

            msgs = msgs.filter(m => m.content.includes(query) && m.id !== message.id)

            if (msgs.size < 1) return top.edit("No messages were found matching the query `"+query+"`")

            if (msgs.size === 1) return msgs.first().delete(), top.edit("Purging 1 message matching the query `"+query+"`")

            message.channel.bulkDelete(msgs, true).then(() => {

                top.edit("Purging "+msgs.size+" message matching the query `"+query+"`")

            }).catch(() => top.edit("`Purge Failed...`"))

        })
    })

}

function purge(message, bot) {

    message.channel.sendMessage("`Collecting...`").then(top => {

        let num = message.args[0] || "no"
        if (num === "no") return message.send("`Not a valid number`")
        num = parseInt(num) || 10
        if (num < 2) num = 2
        num++
        if (num > 100) num = 100
        console.log(num)

        message.channel.fetchMessages({
                limit: num
            })
            .then(msgs => {

                msgs = filter(message, msgs)

                top.edit("`"+msgs.size+" collected. Filtering...`")
                    .then(top => {

                        if (msgs.size < 2) return top.edit("`Not enough messages to purge.`")

                        message.channel.bulkDelete(msgs, true).then(() => {

                            top.edit("`" + message.author.username + " purged " + msgs.size + " in " + message.channel.name + "`")

                        }).catch(() => top.edit("`Purge Failed...`"))

                    })

            }).catch(() => top.edit("`Purge Failed...`"))

    })

}

function filter(message, msgs) {

    msgs = msgs.filter(m => {

        if (m.id === message.id) return false

        let fail = true

        if (message.content.includes(" -b") && !m.author.bot) return false

        if (message.mentions.users.first()) {

            fail = false

            message.mentions.users.forEach(user => {

                if (m.author.id === user.id) fail = true

            })

        }

        if (fail) return true
        return false

    })

    return msgs

}

exports.conf = {
  userPerm: ["MANAGE_MESSAGES"],
  botPerm: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Utility",
  help: "Purge messages in a channel.",
  args: "<int/@mention/all/search> <if(@mention)int/if(search)<phrase>>",
}