const talkedRecently = new Set();

module.exports = {
    name: "eval",
    aliases: [],
    category: "hidden",
    description: "Run code dirrectly",
    ownerOnly: true,
    run: async (client, message, args) => {

        if(!args[0]) return message.reply(":x:idiot alert:x:")
        const user = message.author;
        if(args.join(" ").includes("client.token")) return message.reply("Frick You")

        var output

        try {
          output = eval(args.join(" "))
        } catch (e) {
          message.channel.send({embeds: [{
            "title": `Woops`,
            "description": "```\n" + e + "\n```",
            "color":  client.config.embedColor,
            "author": {
              "name": user.username,
              "icon_url": `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
            },
            "footer": {
              "text": client.config.embedfooterText,
              "icon_url": message.guild.iconURL({ dynamic: false })
            }
          }]})
        }

        if(!output) return

        message.channel.send({embeds: [{
          "title": `EVAL`,
          "description": "```\n" + output + "\n```",
          "color":  client.config.embedColor,
          "author": {
            "name": user.username,
            "icon_url": `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
          },
          "footer": {
            "text": client.config.embedfooterText,
            "icon_url": message.guild.iconURL({ dynamic: false })
          }
        }]})

    },
};
