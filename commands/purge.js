exports.run = (message, bot, suffix, args) => {
  if (!args[0]) return message.channel.sendMessage("**[ Purge Help ]**\n`n!purge <int>`\n*<int>* is a number between 1 and 100.\n`n!purge <int> <@mention(s)>`\n*<int>* is a number between 1 and 100\n*<@mention>* is the user's messages you are deleting, you can mention multiple users.\n`n!purge search <word/phrase>`\n*<word/phrase>* is the search term. Any of the last 100 messages containing the search term will be deleted.\n`n!purge all`\nDeletes every message sent in a channel.");
  if (args[0] === "search") {
    if (!args[1]) return message.channel.sendMessage("Provide the text you wish to search for.");
    let query = suffix.split(" ");
    query.shift();
    query = query.join(" ");
    message.channel.sendMessage("`Searching...`").then(m => {
      message.channel.fetchMessages({
        limit: 100
      }).then(msgs => {
        msgs = msgs.filter(mn => mn.content.includes(query));
        if (msgs.size === 1) return m.edit("Could not find any messages containing the phrase `" + query + "`.");
        message.channel.bulkDelete(msgs).then(() => {
          m.edit("Purged `" + msgs.size + "` message(s) matching the query `" + query + "`.")
        });
      });
    });
  } else if (args[0] === "all") {
    if (!message.channel.permissionsFor(message.guild.member(bot.user)).hasPermission("MANAGE_CHANNELS")) return message.channel.sendMessage("Purging all requires the bot have the `MANAGE_CHANNELS` permission.");
    if (!message.channel.permissionsFor(message.guild.member(bot.user)).hasPermission("MANAGE_CHANNELS")) return message.channel.sendMessage("Purging all requires that you have the `MANAGE_CHANNELS` permission.")
    message.channel.sendMessage("This command will remove __every__ message sent in this channel\nAre you sure you want to continue?\nType `yes`/`no` below.");
    let collect = message.channel.createCollector(m => m.author.id === message.author.id, {
      time: 15000
    });
    collect.on('message', (m) => {
      if (m.content === "yes") {
        purgeChannel(m);
        collect.stop();
      } else if (m.content === "no") {
        m.channel.sendMessage("Channel Purge Canceled.");
        collect.stop();
      }
    });
    collect.on('end', (c, r) => {
      if (r === "time") {
        collect.channel.sendMessage("Command Timed Out.")
      }
    });
  } else {
    message.channel.sendMessage("`Collecting...`").then(mess => {
      let num = parseInt(args[0]) || 10;
      if (num > 100 || num < 1) return message.channel.sendMessage("Purge Failed: Number must be between 1 and 100.")
      message.channel.fetchMessages({
        limit: num
      }).then(msgs => {
        if (message.mentions.users.first()) {
          msgs = msgs.filter(m => {
            let valid = false;
            message.mentions.users.forEach(u => {
              if (u.id === m.author.id && m.id !== mess.id) valid = true;
            })
            if (valid) return true;
            else return false;
          });
          if (msgs.size < 1) return mess.edit("Could not find any messages sent by those users.");
          message.channel.bulkDelete(msgs).then(() => {
            mess.edit("Purging `" + msgs.size + "` message(s).")
          })
        } else {
          msgs = msgs.filter(m => m.id !== mess.id);
          message.channel.bulkDelete(msgs).then(() => {
            mess.edit("Purging `" + (msgs.size + 1) + "` message(s).")
          }).catch(console.log)
        }
      });
    });
  }
}

exports.conf = {
  userPerm: ["MANAGE_MESSAGES"],
  botPerm: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Utility",
  help: "Purge messages in a channel.",
  args: "<int/@mention/all/search> <if(@mention)int/if(search)<phrase>>",
}

function purgeChannel(m) {
  m.channel.clone().then(ch => {
    m.channel.delete().then(channel => {
      let pos = (channel.position === 0) ? 1 : channel.position;
      ch.setPosition(pos).then(c => {
        let topic = channel.topic;
        ch.setTopic(topic).then(c => {
          c.sendMessage("Channel Purge Successful.");
        })
      });
    });
  });
}