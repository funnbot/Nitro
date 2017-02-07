const config = require('../functions/config')
let poll = {};


exports.run = (message, bot, suffix, args, send) => {
  let prefix = config.getPrefix(message.guild.id);
  let id = message.channel.id;
  if (poll[id]) return send("**:no_entry: | There is already a poll running in this channel.**")
  if (!args[0]) return send(`**To Create A Poll:**\n\`${prefix}poll <question> |<option1>|<option2>|<opt...\``);
  let split = args.join(" ").split("|");
  if (!split[0]) return send(`*You must split your question and options with \`|\`\n**To Create A Poll:**\n\`${prefix}poll <question> |<option1>|<option2>|<opt...\``);
  if (!split[1]) return send(`*You must have two or more options to make a poll*\n**To Create A Poll:**\n\`${prefix}poll <question> |<option1>|<option2>|<opt...\``);
  if (!split[2]) return send(`*You must have two or more options to make a poll*\n**To Create A Poll:**\n\`${prefix}poll <question> |<option1>|<option2>|<opt...\``);
  poll[id] = {
    id,
    question: split[0],
    auth: message.author.id,
    voted: {}
  };
  split.shift();
  let opt = {};
  for (i = 0; i < split.length; i++) {
    opt[i + 1] = {
      text: split[i],
      votes: 0
    };
  }
  poll[id].opt = opt;
  let ar = [];
  let num = 1;
  Object.keys(opt).forEach(r => {
    ar.push(num + ". " + opt[r].text) + "";
    num++
  })
  let text = "__**" + poll[id].question + "**__\n\n*You can vote with `" + prefix + "vote <optionNum>`*\n\n**" + ar.join("\n") + "**\n\n*The creator of this poll or a server admin can end the poll early by typing `endpoll` in chat. Otherwise it will go for 2 minutes.*"
  message.channel.sendMessage(text, {
    split: true
  });
  let collect = message.channel.createCollector(m => {
    if (m.author.bot) return false;
    if (m.content.startsWith(prefix + "vote") || m.content === "endpoll") return true
    else return false;
  }, {
    time: 180000
  });
  collect.on('message', (m) => {
    let id = m.channel.id;
    if (m.content === "endpoll") {
      if (poll[id].auth === m.author.id) return collect.stop('early')
      else if (m.channel.permissionsFor(m.member).hasPermission("MANAGE_CHANNELS")) return collect.stop('early')
      else return;
    } else {
      m.delete()
      if (poll[id].voted[m.author.id]) return m.channel.sendMessage("**You have already voted.**");
      let sp = m.content.split(" ");
      if (!sp[1]) return m.channel.sendMessage("**Provide the option number you are voting on**");
      let tot = Object.keys(poll[id].opt).length;
      let num = parseInt(sp[1]) || 0;
      if (num < 1 || num > tot) return m.channel.sendMessage("**The option number must be between 1 and " + tot + "**");
      poll[id].voted[m.author.id] = true;
      poll[id].opt[num.toString()].votes++
    }
  });
  collect.on('end', (col, reas) => {
    if (reas === "time" && col.size < 1) return message.channel.sendMessage("**The poll has ended without any votes.**")
    else if (reas === "early" && col.size < 2) return message.channel.sendMessage("**The poll has ended without any votes.**")
    else done(col.first());
  });
}

function done(message) {
  let id = message.channel.id;
  let opt = [];
  let votes = Object.keys(poll[id].opt);
  votes = votes.sort((a, b) => {
    return poll[id].opt[b].votes - poll[id].opt[a].votes;
  })
  let num = 1;
  let arr = [];
  votes.forEach(p => {
    let i = poll[id].opt[p];
    arr.push("**" + num + ". " + i.text + " = " + i.votes + "**")
    num++
  });
  let text = "*Here are the results:*\n\n__**" + poll[id].question + "**__\n\n" + arr.join("\n");
  message.channel.sendMessage(text);
  return delete poll[id];
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Fun",
  help: "Create a poll",
  args: "",
}