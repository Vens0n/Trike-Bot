const { QuickDB } = require("quick.db");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const tasksDB = new QuickDB({ filePath: "DB/tasks.sqlite" });

module.exports = {
	name: "suggest",
	description: "suggest something to the bot",
	coolDownTime: 5 * 60,
	options: [
		{
			name: "category",
			description: "What type of suggestion is this?",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "Command-Suggestion", value: "Command Suggestion" },
				{ name: "Command-Feedback", value: "Command Feedback" },
				{ name: "Bugreport", value: "Report A Bug" },
				{ name: "Generic-Message", value: "Generic Message" }
			]
		},
		{
			name: "input",
			description: "Text input for the suggestion group selected",
			type: ApplicationCommandOptionType.String,
			required: true,
		}],
	execute: async (client, interaction, args) => {

		var category = interaction.options.getString("category");
  		var input = interaction.options.getString("input");
		var channel = null
		if (category === "Command Suggestion") channel = "1383600260223602778"
		else if (category === "Command Feedback") channel = "1383600285964042280"
		else if (category === "Report A Bug") channel = "1383600314564874341"
		else if (category === "Generic Message") channel = "1383600687241363486"

		const embed = new EmbedBuilder()
			.setTitle(`Suggestion from ${interaction.user.displayName}`)
			.setDescription(`The user suggested:\n\n
				**Category:** ${category}\n
				**Input:** ${input}\n
				**User ID:** ${interaction.user.id}\n
				**Channel Name:** ${interaction.channel}\n
				**Guild Name:** ${interaction.guild}`)
			.setColor(client.config.embedColor())
			.setFooter({ text: `${interaction.user.tag} suggested under ${category}`, iconURL: interaction.user.displayAvatarURL() });
		client.channels.fetch(channel).then((ch) => {
			ch.send({ embeds: [embed] });
			interaction.reply({content: `I have sent over your suggestion/feedback with the following data`, embeds: [embed], ephemeral: true});
		}).catch((err) => {
			interaction.reply({ content: "Yell at Venson to fix this, he had a woopsie with the code: " + err, ephemeral: true });
			console.error("Error fetching channel for suggestion:", err);
		});
	},
};
