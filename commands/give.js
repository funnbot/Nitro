exports.run = (message, bot, send) => {

  let user = message.author

  if (!message.mentions.users.first()) return send('**Mention a user to give them money**')

  let target = message.mentions.users.first()

  if (target.id === message.author.id) return send("**You can't give youself money :stuck_out_tongue_closed_eyes:**")

  if (!message.args[1]) return send("**How much money?**")

  let num = parseInt(message.args[0]) || parseInt(message.args[1]) || false

  if (!num || num < 1) return send("**Invalid Number Provided**")
 
  let money = bot.profile.getMoney(user.id)

  if (num > money) return send("**You do not have that much money**")

  let newMoney = money - num

  let targetMoney = bot.profile.getMoney(target.id)

  let newTargetMoney = targetMoney + num

  bot.profile.setMoney(user.id, newMoney)
  bot.profile.setMoney(target.id, newTargetMoney)

  message.channel.sendMessage("**"+target.username+" has received "+num+" :dollar:**")

}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Social",
  help: "Give your money to someone else",
  args: "",
}