exports.run = (message, bot, send) => {
  let user = (!message.mentions.users.first()) ? message.author : message.mentions.users.first();
  let mon = bot.profile.getMoney(user.id);
  send("**:atm: | " + user.username + " has " + mon + " :donut:**")
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "Social",
  help: "Get your current balance",
  args: "",
}