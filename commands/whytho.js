exports.run = (message, bot) => {
    let memory = [0, 0, 0, 0, 0, 0, 0, 0]
    let code = message.content.replace(/[^12345678\.]/g, "")
    let split = code.split('')
    let output = ""

    split.forEach(i => {
        if (i === ".") {
            let bin = memory.join('')
            let num = parseInt(bin, 2)
            let char = String.fromCharCode(num)
            output += char
        } else {
            let num = parseInt(i) - 1
            memory[num] === 0 ? memory[num] = 1 : memory[num] = 0
        }
    })
    message.channel.send("**Output:** "+output)
}

exports.conf = {
  userPerm: ["MANAGE_GUILD"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Fun",
  help: "whytho",
  args: "<message>"
}