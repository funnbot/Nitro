const util = require('util');
const config = require("../config.js");
const snekfetch = require("snekfetch");
const r = require("rethinkdbdash")({
  db: "Nitro",
  password: config.rethink
})

exports.run = async(message, bot, send) => {
  if (message.author.id !== "163735744995655680") return
  if (message.suffix.length < 1) {
    let txt = evalTxt("Funnbot", "Output", "100000", "An idiot who does not provide code when he evals.")
    return send(txt)
  }
  let processtime,
    start = (new Date()).getTime()
  try {
    let evaled = await eval(message.suffix)
    processtime = (new Date()).getTime() - start
    if (typeof evaled === "object" || typeof evaled === "function") evaled = util.inspect(evaled)
    if (typeof evaled === "string") evaled = evaled.substring(0, 1800).replace("`", "")
    let txt = evalTxt(message.suffix, "Output", processtime, evaled)
    txt = clean(txt)
    return send(txt)
  } catch (e) {
    console.log(e);
    processtime = (new Date()).getTime() - start
    let txt = evalTxt(message.suffix, "Error", processtime, e)
    txt = clean(txt)
    return send(txt)
  }

}

let evalTxt = (a, b, c, d) => {
  return `
:inbox_tray: **Input:**
\`\`\`js
${a}\`\`\`
:outbox_tray: **${b}:**
\`\`\`${b === "Output" ? "js" : "prolog"}
${d}\`\`\`
\`Execution Time: ${c}MS\``
}

let clean = (t) => {
  let split = config.token.split(".")
  let r = new RegExp(`(${split[1]})|(${split[2]})`, "g")
  t = t.toString().replace(r, "[SECRET]")
  return t
}


exports.conf = {
  userPerm: ["DEV"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  category: "DevOnly",
  help: "Eval a bit o code",
  args: "<code>"
}