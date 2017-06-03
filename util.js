let f = {};

f.log = (m) => {
  if (m.guild !== null) {
    console.log(new Date() + " [" + m.guild.name + ": " + m.channel.name + "] <" + m.author.username + "> " + m.content);
  } else {
    console.log(new Date() + " [" + m.author.username + "] " + m.content)
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

f.clean = (content) => {
  content = content.replace(/`/g, '')
  content = content.replace(/\*/g, '')
  return content
}

f.range = (input, minimum, maximum) => {
  if (input < minimum) input = minimum
  if (input > maximum) input = maximum
  return input
}

global.nu = f