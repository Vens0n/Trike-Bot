module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix)) return;
        const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;
        const user = message.author;
        client.channels.cache.get("985762281352745021").send({embeds: [{
      "title": `Command`,
      "description": "```\n.." + cmd + " " + args.join(" ")  + "\n```",
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
        if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) {
                return message.reply({ content: "This command only for Bot Owner!", allowedMentions: { repliedUser: false } });
            }
        }

        await command.run(client, message, args);
    }
}
