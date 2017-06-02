exports.run = (message, bot) => {
  let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
  let member = message.guild.member(user);
  let roles = [];
  if (member.roles.size > 0) {
    member.roles.forEach(r => {
      if (!r.name.includes("everyone")) {
        roles.push(r.name);
      }
    })
  } else {
    roles = "no";
  }
  let ttt = (member.roles.size > 0) ? roles.length : "0";
  let wato = (roles.length > 0) ? roles.join(", ") : "None";
  let game = (!!user.presence && user.presence !== null && user.presence.game !== null && user.presence.game.name !== null) ? user.presence.game.name : "Nothing"
  let embed = {
    author: {
      name: "Who Is: " + user.username,
      icon_url: (user.avatarURL !== null) ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
    },
    color: 0x47D70C,
    thumbnail: {
      url: (user.avatarURL !== null) ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
    },
    fields: [{
      name: "User",
      value: user.username + "#" + user.discriminator,
      inline: true
    }, {
      name: "ID",
      value: user.id,
      inline: true
    }, {
      name: "Nickname",
      value: (member.nickname !== null) ? member.nickname : user.username,
      inline: true
    }, {
      name: "Game",
      value: "Playing " + game,
      inline: true
    }, {
      name: "Status",
      value: (user.presence !== null && user.presence.status !== null) ? user.presence.status : "Offline",
      inline: true
    }, {
      name: "Joined On",
      value: member.joinedAt.toString(),
      inline: true
    }, {
      name: "Account Created On",
      value: user.createdAt,
      inline: true
    }, {
      name: "Roles (" + ttt + ")",
      value: wato,
      inline: true
    }]
  }
  message.channel.send("", {
    embed
  });
}

exports.conf = {
  userPerm: [],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: false,
  category: "Other",
  help: "Find out info about a user.",
  args: "<@mention>"
}