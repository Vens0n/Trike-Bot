const talkedRecently = new Set();
module.exports = {
	name: "suggest",
	options: [{
		name: 'suggestion',
		description: 'What are you suggesting?',
		type: 'STRING',
		required: true
	}],
	category: "Bot",
	version: "1",
	description: "Suggest something to us!",
	ownerOnly: false,
	run: async (client, interaction) => {
		const suggestion = interaction.options.getString("suggestion");

		const row = new client.discord.MessageActionRow()
				.addComponents(
						new client.discord.MessageButton()
								.setLabel("Support")
								.setStyle("LINK")
								.setURL("https://discord.gg/vufvnbdRa7")
				);


		try {
			const helpEmbed = new client.discord.MessageEmbed()
				.setTitle(`Suggestion From ${interaction.user.username}`)
				.setDescription(suggestion)
				.setColor(client.config.embedColor)
				.setFooter({
					text: `${client.config.embedfooterText}`,
					iconURL: `${client.user.displayAvatarURL()}`
				});

			client.channels.cache.get("985762248884641792").send({
        embeds: [helpEmbed]
      })

			interaction.reply({ content: 'Suggestion has been suggested, view said suggestion in my server below.', ephemeral: true, components: [row]  });
		} catch (e) {
			console.error(e)
		}
	},
};
