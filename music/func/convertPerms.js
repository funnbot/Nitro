module.exports = (perm) => {
    if (convert.hasOwnProperty(perm)) return convert[perm]
    else return false
}

const convert = {
    ADMINISTRATOR: "administrator",
    CREATE_INSTANT_INVITE: "createInstantInvite",
    KICK_MEMBERS: "kickMembers",
    BAN_MEMBERS: "banMembers",
    MANAGE_CHANNELS: "manageChannels",
    MANAGE_GUILD: "manageGuild",
    READ_MESSAGES: "readMessages",
    SEND_MESSAGES: "sendMessages",
    SEND_TTS_MESSAGES: "sendTTSMessages",
    MANAGE_MESSAGES: "manageMessages",
    EMBED_LINKS: "embedLinks",
    ATTACH_FILES: "attachFiles",
    READ_MESSAGE_HISTORY: "readMessageHistory",
    MENTION_EVERYONE: "mentionEveryone",
    USE_EXTERNAL_EMOJIS: "externalEmojis",
    CONNECT: "voiceConnect",
    SPEAK: "voiceSpeak",
    MUTE_MEMBERS: "voiceMuteMembers",
    DEAFEN_MEMBERS: "voiceDeafenMembers",
    MOVE_MEMBERS: "voiceMoveMembers",
    USE_VAD: "voiceUseVAD",
    CHANGE_NICKNAME: "changeNickname",
    MANAGE_NICKNAMES: "manageNicknames",
    MANAGE_ROLES: "manageRoles",
    MANAGE_WEBHOOKS: "manageWebhooks",
    MANAGE_EMOJIS: "manageEmojis",
}




 
 
 
 
 
 
 
 
 

 
 

 








ADD_REACTIONS (add new reactions to messages)
VIEW_AUDIT_LOG