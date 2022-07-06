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

        message.channel.send({embeds: [{
      "title": `EVAL`,
      "description": "```\n" + eval(args.join(" ")) + "\n```",
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

    },
};
