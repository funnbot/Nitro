const config = require('./config.js')
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js', {
    totalShards: "auto",
    token: config.token
});
Manager.spawn();

//Guild Api
const express = require('express')
const bot = require('./bot')

const app = express()
const router = express.Router()
const port = process.env.PORT || 2904

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.use('/api/inguild', (req, res, next) => {
    if (req.headers.guildid) {
        let id = req.headers.guildid
        Manager.broadcastEval(`
            this.guilds.has("${id}")
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
        }).catch(console.log)
    } else {
        res.send("Provide guild ID in header")
    }
    next()
})

app.use("/", router);

app.listen(port, () => {
    console.log("inguild listening on port " + port)
})