const search = require('youtube-search')
const config = require('../config')

exports.run = (message, bot, send) => {
    if (!message.args[0]) return send("**Provide the search query**")

    search(message.suffix, {
        maxResults: 1,
        key: config.googleApiToken
    }, (err, res) => {
        if (err) return send("**No results found**")
        if (!res[0]) return send("**No results found**")

        message.channel.send(res[0].link)
    })

}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "Search youtube for a video",
    args: "",
}