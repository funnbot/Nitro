const en = {
    binary: function(msg) {
        let output = ""
        for (var i = 0; i < msg.length; i++) {
            if (msg[i] === " ") output += "00100000"
            else output += 0+msg[i].charCodeAt(0).toString(2);
        }
        return output;
    },
    //morse: function(msg) {

    //},
    pig: function(msg) {
        let m = msg.split(" ");
        let output = "";
        m.forEach(l => {
            let split = l.split("");
            let first = split[0];
            output += l.slice(1)+first+"ay "
        })
        return output.toLowerCase();
    }
}

exports.run = (message, bot, send) => {
    if (!message.args[0]) return send("**The available encryptions are: `" + Object.keys(en).join("` ,`") + "` **");
    if (!en[message.args[0]]) return send("*`" + message.args[0] + "` is not an available encryption*\n**The available encryptions are: `" + Object.keys(en).join("` ,`") + "` **");
    if (!message.args[1]) return send("**Provide a message to be encrypted in `" + message.args[0] + "`");
    let funct = message.args[0];
    message.args.shift();
    message.args = message.args.join(" ");
    let crypt = en[funct](message.args);
    send("`" + crypt + "`");
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Fun",
    help: "Encrypt a message.",
    args: "",
}