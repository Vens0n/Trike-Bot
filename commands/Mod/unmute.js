module.exports = {
    name: "unmute",
    aliases: ["untimeout"],
    category: "Mod",
    usage: '..unmute @username',
    description: "Sometimes people just need to shut up.",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("MODERATE_MEMBERS")) return message.reply("You do not have permissions to untimeout anyone.");
      if (!message.mentions.members.first()) return message.reply("You need to mention someone to untimeout!?");
              try {
                message.mentions.members.first().timeout(0, { reason: 'Trike Bot'})
                  message.reply(message.mentions.members.first().user.username + " has returned")
                } catch(e) {
                  message.reply("I do not have permissions to untimeout anyone");
                  console.log(e)
              }
    },
};
