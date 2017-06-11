nu.getSpecialHelp = (t, p) => {
    let obj = {
        announce: "**[ Announce Help ]**\r\n*#Nitro\'s announce feature allows you to setup messages for when users join or leave.*\r\nFirst you must set the channel with:\r\n`"+p+"announce channel` which will set to your current channel, you can also mention or type an ID to specify another channel.\r\nThen you set the Welcome and Farewell messages. For the welcome message:\r\n`"+p+"announce welcome <welcome message>`\r\nYou can use a few variables in this message aswell.\r\nplace `{member}` which will mention the joining player\r\nplace `{name}` which will write the players name as plain text\r\nplace `{total}` to write your current guild total after the new member\r\nFor the farewell message:\r\n`"+p+"announce farewell <message>`\r\nYou can use the same variables as above except `{member}`\r\nIf you ever want to disable Announcements run the channel command again to completely disable it\r\nor run either the farewell or welcome command *without a message* to only stop sending one of them. ",
        adblock: "**[ AdBlock Help ]**\r\nNitro allows for advanced ad blocking, which stops users from posting httpś:\/\/d\isc\òrd\.\gg\/ links in your server.\r\nTo enable ad blocking use `"+p+"adblock on` (replace `on` with `off` to disable)\r\n**Notifications**\r\nUse `"+p+"adblock notify` to enable\r\nThe server owner will be sent a PM when a user advertises on your server\r\n**Strikes**\nUse `"+p+"adblock strikes` to toggle on or off\nWhen on, users will recieve a strike if they advertise, see `"+p+"pconf` for more info\n**Exceptions**\r\nUse `"+p+"adblock exception add @user` (or @role)\r\nThis will allow that user (or anyone in that role) to be exempt from AdBlock\r\nUse `"+p+"adblock exception remove @user` (or @role) to remove\r\nand `"+p+"adblock exception list` to view all exceptions.\r\n",
        autorole: "**[ AutoRole Help ]**\nNitro's autorole will automatically give a user a specified role on server join\nUse `n!autorole <@role>` to enable or disable a role."
    }
    if (obj.hasOwnProperty(t)) {
        return obj[t];
    } else {
        return false
    }
}