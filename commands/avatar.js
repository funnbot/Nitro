exports.run = (message, bot, suffix, args) => {
  let user;
  if (!message.mentions.users.first()) {
      user = message.author
  } else {
      user = message.mentions.users.first();
  }
  let ava = (user.avatarURL !== null) ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
  let embed = {
      color:0x542437,
      description:"Here is "+user.username+"'s avatar: *[url]("+ava+")*",
      image:{url:ava}
  }
  message.channel.sendMessage("", {embed});
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Retrieve a users avatar.",
  args:"<@mention>",
}