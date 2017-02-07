

exports.run = (message, bot, suffix, args) => {
}

exports.conf = { 
  userPerm: [],  
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Music",
  help: "Queue a soundcloud/youtube link.",
  args: "<url/query>",
}