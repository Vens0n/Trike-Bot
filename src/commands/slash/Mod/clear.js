module.exports = {
	name: "clear",
	category: "Mod",
	description: "Clean this place up",
	ownerOnly: false,
	options: [{
		name: 'amount',
		description: 'How many messages are being wiped',
		type: 'STRING',
		required: true
	}],
	version: "1",
	run: async (client, interaction) => {
		const amount = interaction.options.getString("amount") || "No Reason"
		if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
			interaction.reply({
				content: client.config.permisionerror,
				ephemeral: true,
			});
			return;
		}
		if (amount < 2 || amount > 100) {
      interaction.reply({
				content: 'The number must me from 2 though 100!',
				ephemeral: true,
			});
			return;
    }
		const {
			size
		} = await interaction.channel.bulkDelete(amount, true)
		interaction.reply(interaction.user.username + " has deleted " + size + " messages!")
			.then(msg => {
				setTimeout(() => msg.delete(), 3000)
			})
			.catch();
	},
};
