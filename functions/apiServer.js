const express = require('express')
const bot = require('../bot')

const app = express()
const port = process.env.PORT || 2904

app.use('/api/inguild', (req, res, next) => {
    if (req.headers.guildid) {
        let id = req.headers.guildid
        bot.broadcastEval(`
            bot.guilds.has("${id}")
        `).then(results => {
            let bool = false
            results.forEach(r => bool = r)
            if (bool) {
                res.send(JSON.stringify({
                    has: true
                }))
            } else {
                res.send(JSON.stringify({
                    has: false
                }))
            }
        })
    } else {
        res.send("Provide guild ID in header")
    }

})

app.listen(port, () => {
    console.log("inguild listening on port " + port)
})