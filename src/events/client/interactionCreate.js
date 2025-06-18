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

				// Cooldown
				if (command.coolDownTime) {
					const cooldownKey = `${interaction.user.id}-${interaction.commandName}`;
					const cooldownEnd = client.cooldowns.get(cooldownKey);
					if (cooldownEnd && cooldownEnd > Date.now()) {
						const timeLeft = Math.ceil((cooldownEnd - Date.now()) / 1000);
						return interaction.reply({
							content: `You're on cooldown. Try again <t:${Math.floor(Date.now() / 1000) + timeLeft}:R>`,
							ephemeral: true
						});
					}
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
