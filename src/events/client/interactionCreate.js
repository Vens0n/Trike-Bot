const { QuickDB } = require("quick.db");
const cooldownDB = new QuickDB({ filePath: "DB/cooldowns.sqlite" });

module.exports = {
	name: "interactionCreate",

	async execute(interaction, client) {
		console.log(`[Debug] Interaction type:`, interaction.type, interaction.commandName);

		// Autocomplete support
		if (interaction.isAutocomplete()) {
			const command = client.slash.get(interaction.commandName);
			if (!command || !command.autocomplete) return;
			try {
				await command.autocomplete(client, interaction);
			} catch (e) {
				console.error(e);
			}
			return;
		}

		// Slash commands
		if (interaction.isCommand()) {
			console.log(`Command: ${interaction.commandName} by ${interaction.user.tag}`);
			const command = client.slash.get(interaction.commandName);
			if (!command) {
				interaction.reply({ content: "An error occurred, check console." });
				console.error(`Command not found: ${interaction.commandName}`);
			} else {
				// Owner check
				let isOwner = client.config.ownerIDs.includes(interaction.user.id);
				if (command.ownerOnly && !isOwner) return;




				const userKey = `cooldown_${command.name}_${interaction.user.id}`;
				const now = Date.now();
				const cooldownUntil = await cooldownDB.get(userKey);
				console.log(`[Debug] Cooldown for ${command.name} by ${interaction.user.id}:`, cooldownUntil, now);
				if (cooldownUntil && cooldownUntil > now) {
					return interaction.reply({
						content: `⏳ You're on cooldown! Try again <t:${(cooldownUntil / 1000).toFixed(0)}:R> .`,
						ephemeral: true
					});
				}




				const args = interaction.options.data.map(option => option.value);

				try {
					await command.execute(client, interaction, args);

					// Set cooldown
					if (command.coolDownTime) {
						const cooldownTime = command.coolDownTime * 1000;
						client.cooldowns.set(`${interaction.user.id}-${interaction.commandName}`, Date.now() + cooldownTime);
						setTimeout(() => client.cooldowns.delete(`${interaction.user.id}-${interaction.commandName}`), cooldownTime);
					}
				} catch (e) {
					console.error(e);
					interaction.reply({ content: "❌ An unexpected error occurred.", ephemeral: true });
				}
			}
		}
	},
};
