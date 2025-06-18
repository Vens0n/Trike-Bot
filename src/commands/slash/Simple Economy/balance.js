const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });
module.exports = {
	name: "balance",
	description: "View your balance.",
	type: 1,
	options: [
		{
			name: "user",
			description: "Who do you want to check the balance of?",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
	execute: async (client, interaction) => {
		var user = interaction.options.getUser('user') || interaction.user;
		const wallet = (await moneyDB.get(`wallet_${user.id}`)) || 0;
		const bank = (await moneyDB.get(`bank_${user.id}`)) || 0;
		const embed = new EmbedBuilder()
			.setTitle(user.displayName + "'s Balance")
			.setDescription("You boot up your computer and check your balance.")
			.addFields([
				{
					name: "Wallet 👜",
					value: `$${wallet.toFixed(2)}`,
					inline: true,
				},
				{
					name: "Bank 🏦",
					value: `$${bank.toFixed(2)}`,
					inline: true,
				},
			])
			.setColor(client.config.embedColor())
			.setFooter({ text: `${user.displayName} financial status.`, iconURL: user.displayAvatarURL() });
		await interaction.reply({ embeds: [embed] });
	},
};
