const { QuickDB } = require("quick.db");

module.exports = {
    name: "joinrole",
    aliases: ["autorole"],
    category: "Utility",
    description: "Suit up those new users!",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Admin only command, shoo");
      const db = new QuickDB()
      if(args[0] == "none" || args[0] == "remove" || args[0] == "delete") {
        await db.set(`welcomerole_${message.guild.id}`, 0)
        message.reply("New users will no longer get a role when they join!")
      } else {
        if(!message.mentions.roles.first()) return message.reply("..joinrole \@member")
        await db.set(`welcomerole_${message.guild.id}`, message.mentions.roles.first().id)
        message.reply("New users will get the " + message.mentions.roles.first().name + " role.")
      }
    },
};
