let f = {};

f.error = (msg, content, delay) => {
  let embed = {
    color: 0xCB0000,
    description: content
  }
  msg.channel.sendMessage("", {
    embed
  }).then(m => {
    if (delay) {
      m.delete(delay)
    }
  })
}

f.warn = (msg, content, delay) => {
  let embed = {
    color: 0xFFE600,
    description: content
  }
  msg.channel.sendMessage("", {
    embed
  }).then(m => {
    if (delay) {
      m.delete(delay)
    }
  })
}

f.succ = (msg, content, delay) => {
  let embed = {
    color: 0x21C107,
    description: content
  }
  msg.channel.sendMessage("", {
    embed
  }).then(m => {
    if (delay) {
      m.delete(delay)
    }
  })
}

f.info = (msg, content, delay) => {
  let embed = {
    color: 0x28B8E6,
    description: content
  }
  msg.channel.sendMessage("", {
    embed
  }).then(m => {
    if (delay) {
      m.delete(delay)
    }
  })
}

f.log = (m) => {
  if (m.guild !== null) {
  //console.log(new Date() + " [" + m.guild.name + ": " + m.channel.name + "] <" + m.author.username + "> " + m.content);
  } else {
    //console.log(new Date() + " ["+m.author.username+"] " + m.content)
  }
}

f.removeA = (array, search_term) => {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i] === search_term) {
      array.splice(i, 1);
      return array;
    }
  }
}

global.tro = f