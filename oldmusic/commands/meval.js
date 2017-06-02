const util = require('util')

exports.run = (message, bot, suffix, args) => {
    if (message.author.id === "163735744995655680") {

        try {
            let toeval = eval(suffix);
            let inspect = util.inspect(toeval);

            if (inspect.length > 1900) {
                inspect = inspect.substr(0, 1900);
            }
            message.channel.send("**Input**\n" + suffix + "\n\n**Output**\n```js\n" + inspect + "```")
                .then(m => m.delete(20000)).catch(console.log);
        } catch (err) {
            message.channel.send("**```prolog\nError:\n\n" + err + "```**")
                .then(m => m.delete(20000)).catch(console.log);
        }
    }
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "dev",
    help: "Evla",
    args: "",
}