module.exports = {
    name: "mute",
    aliases: ["timeout"],
    category: "Mod",
    usage: '..mute @username',
    description: "Let us speak!!",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("MODERATE_MEMBERS")) return message.reply("You do not have permissions to timeout anyone.");
      if (!message.mentions.members.first()) return message.reply("You need to mention someone to timeout!?");
              try {
                message.mentions.members.first().timeout(43200000, { reason: 'Trike Bot'})
                  message.reply(message.mentions.members.first().user.username + " has been muted for 12 hours!")
              } catch(e) {
                  message.reply("I do not have permissions to timeout anyone");
                  console.log(e)
              }
    },
};
