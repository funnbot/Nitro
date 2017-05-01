const util = require('util')

exports.run = (message, bot, send) => {
    if (message.author.id === "163735744995655680") {

        try {
            let toeval = eval(message.suffix);
            let inspect = util.inspect(toeval);

            if (inspect.length > 1900) {
                inspect = inspect.substr(0, 1900);
            }
            send("**Input**\n" + message.suffix + "\n\n**Output**\n```js\n" + inspect + "```")
                .then(m => setTimeout(
                    () => m.delete()
                    , 20000)).catch(console.log);
        } catch (err) {
            send("**```prolog\nError:\n\n" + err + "```**")
                .then(m => setTimeout(
                    () => m.delete()
                    , 20000)).catch(console.log);
        }
    }
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "DevOnly",
    help: "Eval code",
    args: "",
}