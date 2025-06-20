const { ApplicationCommandOptionType, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });

module.exports = {
	name: "coinflip",
	description: "Gambling? Hell yeah! Flip a coin and bet on heads or tails.",
	type: 1,
	options: [
		{
			name: "amount",
			description: "How much do you want to gamble? (Max 50$)",
			type: ApplicationCommandOptionType.Number,
			required: true,
		},
	],
	coolDownTime: 1 * 60,
	execute: async (client, interaction, args) => {
		var gamblingamount = args[0];

		var userbal = (await moneyDB.get(`wallet_${interaction.user.id}`)) || 0;

		if (isNaN(gamblingamount) || gamblingamount <= 0) {
			return interaction.reply({ content: 'Amount must be a positive number or "all"', ephemeral: true });
		} else if (gamblingamount > userbal) {
			return interaction.reply({ content: "Get more money, you have $" + userbal.toFixed(2), ephemeral: true });
		}

		var alertdf = "";

		if (gamblingamount > 50) {
			gamblingamount = 50;
			alertdf = "\n-# (Max Gambling Amount At A Time Is 50$)";
		}

		const embed = new client.discord.EmbedBuilder()
			.setTitle(`Flip a coin!`)
			.setColor(client.config.embedColor())
			.setDescription(`What are you betting $${gamblingamount} on` + alertdf)
			.setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

		const newbuttons = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("THECOINHEADID").setEmoji("🌕").setStyle(ButtonStyle.Secondary)).addComponents(new ButtonBuilder().setCustomId("THECOINTAILSID").setEmoji("🌑").setStyle(ButtonStyle.Secondary));

		var keepthismsg = await interaction.reply({ embeds: [embed], components: [newbuttons] });

		const collectorFilter = (i) => i.user.id === interaction.user.id;
		//console.log(keepthismsg.awaitMessageComponent());
		try {
			const collector = await keepthismsg.awaitMessageComponent({ filter: collectorFilter, time: 10000 });

			var isheads = Math.random() < 0.5;
			if (collector.customId == "THECOINHEADID") {
				if (isheads) {
					const embed = new client.discord.EmbedBuilder()
						.setTitle(`You picked heads!`)
						.setColor(client.config.embedColor())
						.setDescription("We flipped heads, you **win**!\nYou won $" + gamblingamount + "\nYou now have $" + (gamblingamount + userbal).toFixed(2))
						.setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

					const newbuttons = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("THECOINHEADID").setEmoji("🌕").setStyle(ButtonStyle.Success).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId("THECOINTAILSID").setEmoji("🌑").setStyle(ButtonStyle.Secondary).setDisabled(true));
					await keepthismsg.edit({ embeds: [], components: [], content: `<@${interaction.user.id}> picked heads.` });
					collector.reply({ embeds: [embed], components: [newbuttons] });
					userbal += gamblingamount;
				} else {
					const embed = new client.discord.EmbedBuilder()
						.setTitle(`You picked heads!`)
						.setColor(client.config.embedColor())
						.setDescription("We flipped tails, you **loose**!\nYou lost $" + gamblingamount + "\nYou now have $" + (userbal - gamblingamount).toFixed(2))
						.setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

					const newbuttons = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("THECOINHEADID").setEmoji("🌕").setStyle(ButtonStyle.Danger).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId("THECOINTAILSID").setEmoji("🌑").setStyle(ButtonStyle.Secondary).setDisabled(true));
					await keepthismsg.edit({ embeds: [], components: [], content: `<@${interaction.user.id}> picked heads.` });
					collector.reply({ embeds: [embed], components: [newbuttons] });
					userbal -= gamblingamount;
				}
			}
			if (collector.customId == "THECOINTAILSID") {
				if (isheads) {
					const embed = new client.discord.EmbedBuilder()
						.setTitle(`You picked tails!`)
						.setColor(client.config.embedColor())
						.setDescription("We flipped heads, you **loose**!\nYou lost $" + gamblingamount + "\nYou now have $" + (userbal - gamblingamount).toFixed(2))
						.setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

					const newbuttons = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("THECOINHEADID").setEmoji("🌕").setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId("THECOINTAILSID").setEmoji("🌑").setStyle(ButtonStyle.Danger).setDisabled(true));
					await keepthismsg.edit({ embeds: [], components: [], content: `<@${interaction.user.id}> picked tails.` });
					collector.reply({ embeds: [embed], components: [newbuttons] });
					userbal -= gamblingamount;
				} else {
					const embed = new client.discord.EmbedBuilder()
						.setTitle(`You picked heads!`)
						.setColor(client.config.embedColor())
						.setDescription("We flipped tails, you **win**!\nYou gain $" + gamblingamount + "\nYou now have $" + (gamblingamount + userbal).toFixed(2))
						.setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

					const newbuttons = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("THECOINHEADID").setEmoji("🌕").setStyle(ButtonStyle.Secondary).setDisabled(true)).addComponents(new ButtonBuilder().setCustomId("THECOINTAILSID").setEmoji("🌑").setStyle(ButtonStyle.Success).setDisabled(true));
					await keepthismsg.edit({ embeds: [], components: [], content: `<@${interaction.user.id}> picked heads.` });
					collector.reply({ embeds: [embed], components: [newbuttons] });
					userbal += gamblingamount;
				}
			}
			moneyDB.set(`wallet_${interaction.user.id}`, userbal);
			await client.cooldownDB.set(`cooldown_${module.exports.name}_${interaction.user.id}`, Date.now() + module.exports.coolDownTime * 1000);

		} catch (err) {
			console.error("Error in coinflip command:", err);
			await interaction.editReply({ content: "Confirmation not received within 10 seconds, cancelling", embeds: [], components: [] });
		}
	},
};
// 🌕
// 🌑
