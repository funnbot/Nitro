const Discord = require("discord.js")

let start = async (bot) => {
  let webhook = new Discord.WebhookClient("336196327975419906", "LfGQ70qrtgMQMfQYGNY2WrLWfNYzdRMAE6d7cEOB1cQ5PLJlJSPkFEGwHiHNzIOXsKps")
  let embed = new bot.embed()
  if (bot.shard) {
    embed.addField("Shard", "**" + (bot.shard.id + 1) + "/" + bot.shard.count + "**", true)
      .addField("Module", "**" + bot.module + "**", true)
      .addField("Bot", "**" + bot.user.tag + " " + bot.user.id + "**")
    try {
      let app = await bot.fetchApplication()
      embed.addField("Owner", "**" + app.owner.tag + " " + app.owner.id + "**")
    } catch (err) {
      console.log(err)
      embed.addField("Owner", "**Unknown**")
    }
    embed.setColor("#387ee5")
    embed.setTitle("NitroMain")
    embed.setTimestamp(new Date())
    return webhook.send("", {embeds: [embed]})
  } else {
    embed.addField("Module", "**" + bot.module + "**")
      .addField("Bot", "**" + bot.user.tag + " " + bot.user.id + "**")
    try {
      let app = await bot.fetchApplication(bot.user)
      embed.addField("Owner", "**" + app.user.tag + " " + bot.user.id + "**")
    } catch (err) {
      embed.addField("Owner", "**Unknown**")
    }
    embed.setColor("#1E88E5")
    embed.setTitle("NitroMain")
    embed.setTimestamp(new Date())
    return webhook.send("", {embeds: [embed]})
  }
}

let crash = (bot) => {

}

module.exports = {start, crash}
