const math = require('mathjs');

exports.run = (message, bot) => {
  let repo;
  try {
    repo = math.eval(message.suffix);
  } catch (err) {
    repo = err
  }
  message.channel.send("**Input**\n```js\n" + message.suffix + "```\n**Output**\n```js\n" + repo + "```")
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Fun",
  help: "Do some math.",
  args: "",
}