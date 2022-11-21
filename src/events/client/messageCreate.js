
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

        if (command.ownerOnly) {
          let allowed = false
          client.config.ownerIDs.forEach(id => {
            if (message.author.id !== id) allowed = true
          })
          if(!allowed) return
        }

        await command.run(client, message, args);
    }
}
