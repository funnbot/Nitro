const bot = require('../bot.js')

exports.Mcheck = (perms, message) => {
  let custom = bot.config.getPerms(message.guild.id)
  if (perms.length === 0) return {
    has: true,
    miss: []
  };
  let can = {
    has: true,
    miss: []
  };
  perms.forEach(p => {
    if (p.toLowerCase() === "dev") {
      if (message.author.id !== "163735744995655680") {
        can.has = false;
        can.miss.push(p);
      }
    } else {
      let perm = message.channel.permissionsFor(message.author);
      if (!perm && message.author.id !== message.guild.owner.user.id && message.author.id !== "163735744995655680") {
        can.has = false;
        can.miss.push(p);
      }
    }
  })
  return can;
}

exports.Bcheck = (perms, message) => {
  if (perms.length === 0) return {
    has: true,
    miss: []
  };
  let can = {
    has: true,
    miss: []
  };
  perms.forEach(p => {
    let perm = message.channel.permissionsFor(message.guild.member(bot.user)).has(p);
    if (!perm) {
      can.has = false;
      can.miss.push(p);
    }
  })
  return can;
}