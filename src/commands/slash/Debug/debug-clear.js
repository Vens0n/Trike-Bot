module.exports = {
	name: "debug-clear",
	description: "restart the bot and clear all commands",
	type: 1, // ApplicationCommandType.ChatInput
	ownerOnly: true, // Only the bot owner can use this command
	options: [], // if needed
	execute: async (client, interaction) => {
		try {
			// Clear global commands
			console.log("Clearing global commands...");
			await client.application.commands.set([]);
			console.log("Global commands cleared.");

			// Clear commands from all guilds
			console.log("Clearing guild-specific commands...");
			for (const guild of client.guilds.cache.values()) {
				await guild.commands.set([]);
				console.log(`Commands cleared from guild: ${guild.name} (${guild.id})`);
			}
			console.log("Guild commands cleared.");

			// Respond before shutdown
			await interaction.reply({ content: "All commands cleared. Shutting down...", ephemeral: true });

			// Shutdown the bot
			console.log("Shutting down bot...");
			process.exit(0); // Gracefully shuts down the bot
		} catch (error) {
			console.error("Error clearing commands or shutting down:", error);
			await interaction.reply({ content: "An error occurred while clearing commands.", ephemeral: true });
		}
	},
};
