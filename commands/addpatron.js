exports.run = (message, bot, send) => {
    let patrons = bot.system.getPatrons();
    let id = message.suffix.trim().replace(/[^0-9]/g, "");
    if (patrons[id]) {
        delete patrons[id];
        send("Deleted " + id);
    } else {
        patrons[id] = true;
        send("Added " + id);
    }
    bot.system.setPatrons(patrons);
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"DevOnly",
  help:"Add a patron.",
  args:"",
}