const request = require("request")
const sim = require('string-similarity')
let cur = {}

exports.run = (message, bot, send) => {
  if (cur[message.channel.id]) return send("**Wait for the current trivia game to complete**")
  cur[message.channel.id] = true
  let qr = request("http://jservice.io/api/random", function(err, res, body) {
    if (err) {
      console.log(err)
      delete cur[message.channel.id]
      send("**Api Error**")
      return
    }
    let quiz = JSON.parse(body)
    if (!quiz[0] || !quiz[0].question) {
      delete cur[message.channel.id]
      send("**Api Error**")
      return
    }
    let embed = {
      "title": "`Random Trivia`",
      "color": 0x50FF38,
      "description": "You have 30 seconds to answer the question.",
      "author": {
        "name": message.guild.name,
        "icon_url": message.guild.iconURL
      },
      "fields": [{
        "name": "Catagory",
        "value": quiz[0].category.title
      }, {
        "name": "Question",
        "value": quiz[0].question ? quiz[0].question : "Api Error"
      }]
    };
    message.channel.send("", {
      embed
    });
    const collector = message.channel.createCollector(m => m.author.bot === false, {
      time: 30000,
    });

    collector.on('collect', (m) => {
      let same = sim.compareTwoStrings(quiz[0].answer.toLowerCase(), m.content.toLowerCase())
      if (same > .65) {
        collector.stop([m.author.username, m.author.id]);
      }
    })
    collector.on('end', (collected, reason) => {
      delete cur[message.channel.id]
      if (reason === "time") {
        message.channel.send("The 30 seconds are up, the correct answer was: " + quiz[0].answer)
      } else {
        message.channel.send("**Correct!** " + reason[0] + " has answered the question. Heres $100!")
        bot.profile.addMoney(reason[1], 100)
      }
    })
  });
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Fun",
  help: "I'll ask a trivia question in chat.",
  args: "",
}
