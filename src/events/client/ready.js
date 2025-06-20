module.exports = {
	name: "ready",
	once: true,

	/**
	 * @param {Client} client
	 */
	async execute(client) {
		// Puts an activity
		client.user.setActivity(client.config.status, { type: client.config.statusType });

		// Send a message on the console
		console.log(`[LOG] ${client.user.tag} is now online!`);
		console.log(`[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers`);
		console.log(`[LOG] Bot serving ${client.users.cache.size} users`);
	},
};
