const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });
module.exports = {
	name: "beg",
	description: "Why work when you can beg?",
	type: 1,
	coolDownTime: 15 * 60,
	execute: async (client, interaction, args) => {
		if (Math.random() < 0.5) {
			const money = 2 + Math.random() * 3;
			const wallet = (await moneyDB.get(`wallet_${interaction.user.id}`)) || 0;
			const embed = new EmbedBuilder()
				.setTitle("Begging")
				.setDescription("You beg for money, you got a whole **$" + money.toFixed(2) + "**!")
				.setColor(client.config.embedColor())
				.setFooter({ text: `${interaction.user.displayName} has a total of $${(wallet + money).toFixed(2)}.`, iconURL: interaction.user.displayAvatarURL() });
			await moneyDB.add(`wallet_${interaction.user.id}`, money.toFixed(2));
			await interaction.reply({ embeds: [embed] });
			return;
		}

		const embed = new EmbedBuilder()
			.setTitle("Begging")
			.setDescription("You beg for money, but no one gives you anything. You are sad.")
			.setColor(client.config.embedColor())
			.setFooter({ text: `${interaction.user.displayName} begged for some cash.`, iconURL: interaction.user.displayAvatarURL() });

		await interaction.reply({ embeds: [embed] });
	},
};
