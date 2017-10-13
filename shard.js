const config = require('./config.js')
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js', {
    totalShards: 4,
    token: config.token
});
Manager.spawn();

setTimeout(() => {
    console.log("restarting")
    process.exit()
}, 5184e5);

//Guild Api
const express = require('express')

const app = express()
const router = express.Router()
const port = process.env.PORT || 2904

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.use('/api/inguild', (req, res) => {
    if (req.headers.guildid) {
        let id = req.headers.guildid
        Manager.broadcastEval(`this.guilds.has("${id}")`).then(results => {
            bool = results.indexOf(true) > -1 ? true : false
            if (bool) {
                return res.send(JSON.stringify({has: true}))
            } else {
                return res.send(JSON.stringify({has: false}))
            }
        }).catch(console.log)
    } else {
        return res.send("Provide guild ID in header")
    }
})

app.use("/", router);

app.listen(port, () => {
    console.log("inguild listening on port " + port)
})