exports.run = (message, bot, send) => {
  send("", {files: ["http://oi53.tinypic.com/qyv588.jpg"]})
}

exports.conf = {
  userPerm:[],
  botPerm:["SEND_MESSAGES"],
  coolDown:0,
  dm:true,
  category:"Donator",
  help:"A daily dose of awesome.",
  args:"",
}
