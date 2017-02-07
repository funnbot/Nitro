const fs = require('fs');
const cmd = require('../functions/loadCommands.js');

exports.run = (message, bot, suffix, args) => {
  fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(f => {
      if (args[0] + ".js" === f) {
        let t = cmd.reload(args[0]);
        if (!t.worked) {
          message.channel.sendMessage("Errored when reloading command: "+f+"```js\n"+t.error+"```");
        } else {
          message.channel.sendMessage("Reload successful");
        }
        return;
      }
    });
  });
}

function reload(file) {
  try {
    let check = require(file);
    delete require.cache[require.resolve(file)]
    let good = require(file);
    return {
      worked: true
    };
  } catch (err) {
    return {
      worked: false,
      error: err
    };
  }
}

exports.conf = {
  userPerm: ["DEV"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "DevOnly",
  help: "Reload a module",
  args: "<module>"
}
