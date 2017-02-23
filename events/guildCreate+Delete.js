const bot = require('../bot.js').bot;
const request = require('request');
const auth = require('../auth.js').auth;
const config = require('../functions/config');

bot.on('guildCreate', (g) => {
    g.defaultChannel.sendMessage("**Hello I Am Nitro, Your helpful Server Management Bot**\n\n**Use `n!help` to get started.**\n*More interesting in memes than management? try my other bot: <http://bot.discord.io/mopbot>*")
    request({
       url: "https://bots.discord.pw/api/bots/264087705124601856/stats",
       method: "POST",
       json: true,
       headers: {
        "Authorization": auth.apiToken
       },
       body: {
        "server_count": bot.guilds.size
       }
      }, function(error, response, body) {});
    let embed = {
        title:"Added To: "+g.name+" (ID: "+g.id+")",
        color: 0x02FF99,
        fields: [
            {
                name: "Users", 
                value: g.members.filter(u => u.user.bot === false).size,
                inline:true
            }, {
                name: "Bots",
                value: g.members.filter(u => u.user.bot === true).size,
                inline:true
            }, {
                name: "Owner",
                value: g.owner.user.username,
                inline:true
            }
        ],
        timestamp: new Date(),
        footer:{text:"Guild Total: "+bot.guilds.size, icon_url:bot.user.avatarURL}
    }
    bot.channels.get('269248681126002698').sendMessage("", {embed});
})

bot.on('guildDelete', (g) => {
    config.guildLeave(g.id);
    request({
       url: "https://bots.discord.pw/api/bots/264087705124601856/stats",
       method: "POST",
       json: true,
       headers: {
        "Authorization": auth.apiToken
       },
       body: {
        "server_count": bot.guilds.size
       }
      }, function(error, response, body) {});
    let embed = {
        title:"Left: "+g.name+" (ID: "+g.id+")",
        color: 0xE54242,
        fields: [
            {
                name: "Users", 
                value: g.members.filter(u => u.user.bot === false).size,
                inline:true
            }, {
                name: "Bots",
                value: g.members.filter(u => u.user.bot === true).size,
                inline:true
            }, {
                name: "Owner",
                value: g.owner.user.username,
                inline:true
            }
        ],
        timestamp: new Date(),
        footer:{text:"Guild Total: "+bot.guilds.size, icon_url:bot.user.avatarURL}
    }
    bot.channels.get('269248681126002698').sendMessage("", {embed}).catch(console.log);
})