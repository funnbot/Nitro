exports.run = async (message, bot, send) => {
    let id = message.author.id;
    let patrons = bot.system.getPatrons();
    if (!patrons[id]) 
        return send("**You must be a patron to use this command, donate at <https://patreon.com/nitrobot>**")

    try {
        await message.guild.fetchMember(message.author);
        await message.guild.fetchMember(bot.user);
    } catch(e) {
        return send("**Something went wrong.**");
    }
    let member = message.member;
    if (!member.voiceChannel) return send("**You must be in a voice channel for this command.**")
    if (message.guild.member(bot.user).voiceChannel) return send("**Im already playing something.**")

    member.voiceChannel.join().then(voiceConnection => {
        voiceConnection.playFile("./images/stopit.mp3")
        setTimeout(() => voiceConnection.disconnect(), 4000)
    }).catch(console.log)
}

exports.conf = {
    userPerm: [],
    botPerm: ["SEND_MESSAGES"],
    coolDown: 0,
    dm: false,
    category: "Secret",
    help: "Plays a secret message in VC. Donators only.",
    args: "",
}