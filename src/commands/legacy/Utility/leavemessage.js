const { QuickDB } = require("quick.db");

module.exports = {
    name: "leavemessage",
    aliases: ["leavemessage", "leavemessage", "leavemsg", "leavemsg"],
    category: "Utility",
    description: "What to say when someone leaves",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Admin only command, shoo");
      const db = new QuickDB()
      if(!args[0]) return message.reply("`..leavemessage Everyone leave USER_PING!`")
      await db.set(`leavemessage_${message.guild.id}`, args.join(" "))
      var demomessage =  args.join(" ").replace("USER_PING", "<@" + message.author.id + ">").replace("USER_NAME", message.author.username)
      message.reply("The leave message is now: " + demomessage)
    },
};
