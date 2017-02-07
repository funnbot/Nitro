exports.run = (message, bot, suffix, args) => {
  let time = (new Date).getTime();
  message.channel.sendMessage("Pong").then(m => {
    let t = (new Date).getTime() - time;
    m.edit("Pong (took: "+t+"ms)")
  })
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Other",
  help:"Ping! Pong!",
  args:""
}