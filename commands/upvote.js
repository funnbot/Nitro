exports.run = (message, bot, send) => {
    const msg = `
    **__Heres how to upvote Nitro.__**
    **Go to <https://discordbots.org/>, click the Login button, and sign in with your discord account.
    Now go to <https://discordbots.org/bot/nitro> and click the Upvote button and make it green.
    Congrats!**
    `
    send(msg);
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: true,
    category: "Special",
    help: "Show your love for Nitro by upvoting it.",
    args: "",
}