const talkedRecently = new Set();

module.exports = {
    name: "suggest",
    aliases: ["sug"],
    category: "Bot",
    description: "HEY DEV!",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (talkedRecently.has(message.author.id)) {
              message.channel.send("Give it a break before suggesting something! - <@" + message.author + ">");
      } else {
        if(!args[0]) return message.reply("Whats there to suggest!?")
        const user = message.author;

        client.channels.cache.get("985762248884641792").send({embeds: [{
      "title": `Suggestion!`,
      "description": args.join(" "),
      "color": "ff0000",
      "author": {
        "name": user.username,
        "icon_url": `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      },
      "footer": {
        "text": message.guild.name,
        "icon_url": message.guild.iconURL({ dynamic: false })
      }
    }]})
    message.reply("This has been suggested!")

          talkedRecently.add(message.author.id);
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
          }, 60000);
      }
    },
};
