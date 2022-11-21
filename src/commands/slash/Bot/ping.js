module.exports = {
     name:  "ping" ,
     usage: 'ping',
     options: [],
     category:  "Bot" ,
     description:  "Get ping latency" ,
     ownerOnly: false,
     version: "1",
     run: async (client, interaction) => {
        const msg = await interaction.channel.send(`Pinging...`);

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: Bot Ping')
            .addField("Time", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
            .addField("API Ping", `${client.ws.ping}ms`, true)
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        await interaction.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } });

        msg.delete();
    },
};
