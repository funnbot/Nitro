const urban = require('urban')

exports.run = (message, bot, send) => {
  try {
    var search = urban(message.suffix);
  } catch (e) {
    return send("**There were no results for this search term**");
  }
  if (!search || !search.first || typeof search.first !== "function") return;
  search.first(function (json) {
    if (json) {
      if (!json.definition || !json.example) return;
      if (json.definition.length > 1000) json.definition = json.definition.substr(0, 1000);
      if (json.example.length > 1000) json.example = json.example.substr(0, 1000);
      message.channel.send("", {
        "embed": {
          "title": "**" + message.suffix + "**",
          "url": json.permalink,
          "color": 0xD71A75,
          "author": {
            "name": "Urban Dictionary",
            "icon_url": message.guild.iconURL
          },
          "fields": [{
            "name": "**Definition**",
            "value": json.definition
          }, {
            "name": "**Example**",
            "value": json.example
          }],
          "footer": {
            "text": "Powered By Urban Dictionary",
            "icon_url": "http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png"
          }
        }
      })
    } else {
      send("**There were no results for this search term**")
    }
  });
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Fun",
  help: "Search on Urban Dictionary",
  args: "",
}