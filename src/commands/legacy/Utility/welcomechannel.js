const { QuickDB } = require("quick.db");

module.exports = {
    name: "welcomechannel",
    aliases: ["joinchannel"],
    category: "Utility",
    description: "Alert to the current channel when a user joins your server!",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Admin only command, shoo");
      const db = new QuickDB()
      if(args[0] == "none" || args[0] == "remove" || args[0] == "delete") {
        await db.set(`welcomechannel_${message.guild.id}`, 0)
        message.reply("This is no longer the welcome channel!")
      } else {
        await db.set(`welcomechannel_${message.guild.id}`, message.channel.id)
        message.reply("I've set this channel up for some cozy welcome messages!")
      }
    },
};
