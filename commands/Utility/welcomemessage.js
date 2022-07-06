const { QuickDB } = require("quick.db");

module.exports = {
    name: "welcomemessage",
    aliases: ["joinmessage", "welcomemessage", "joinmsg", "welcomemsg"],
    category: "Utility",
    description: "What to say when someone joins",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Admin only command, shoo");
      const db = new QuickDB()
      if(!args[0]) return message.reply("`..welcomemessage Everyone welcome USER_PING!`")
      await db.set(`welcomemessage_${message.guild.id}`, args.join(" "))
      var demomessage =  args.join(" ").replace("USER_PING", "<@" + message.author.id + ">").replace("USER_NAME", message.author.username)
      message.reply("The welcome message is now: " + demomessage)
    },
};
