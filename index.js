console.clear();
console.debug(`Booting up…`);

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const Discord = require("discord.js");
const { Client, Collection, Intents } = Discord;
const handler = require("./src/handlers/index");

const client = new Client({
	intents: [
		// Guild (server) intents
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildModeration,
		Discord.GatewayIntentBits.GuildIntegrations,
		Discord.GatewayIntentBits.GuildWebhooks,
		Discord.GatewayIntentBits.GuildInvites,
		Discord.GatewayIntentBits.GuildVoiceStates,
		Discord.GatewayIntentBits.GuildPresences,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildMessageReactions,
		Discord.GatewayIntentBits.GuildMessageTyping,

		// DM (Direct Message) intents
		Discord.GatewayIntentBits.DirectMessages,
		Discord.GatewayIntentBits.DirectMessageReactions,
		Discord.GatewayIntentBits.DirectMessageTyping,

		// Content (needed for reading message bodies)
		Discord.GatewayIntentBits.MessageContent,
	],

	// Required for handling things like DMs and uncached messages/reactions
	partials: [
		Discord.Partials.Channel, // Needed for DMs
		Discord.Partials.Message, // Needed for uncached message events
		Discord.Partials.Reaction, // Needed for uncached reaction events
		Discord.Partials.GuildMember, // Needed for guild member updates
		Discord.Partials.User, // Needed for user objects in interactions
	],
});

// Call .env file to get Token
require("dotenv").config();
// ! THIS IS NOT A DRILL
// Global Variables
client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require("./config");
client.shop = require("./shop");
client.cwd = require("process").cwd(); // require('path').resolve(``);
client.getLevel = function (xp) {
	let level = 1;
	let xpRequired = xpRequiredForNextLevel(level);

	while (xp >= xpRequired) {
		xp -= xpRequired;
		level++;
		xpRequired = xpRequiredForNextLevel(level);
	}

	return level;
};
client.random = function (min, max, fix) {
	return Number((Math.random() * max + min).toFixed(fix));
};
function xpRequiredForNextLevel(level) {
	return 2 * level ** 1.5 + 20 * level + 50;
}

module.exports = client;

// Records commands and events
handler.loadEvents(client);
handler.loadSlashCommands(client);
client.config.removeUserTaskIfExists = handler.removeUserTaskIfExists;
client.on("ready", () => {
	handler.loadTaskLoader(client);
});

client.cooldowns = new Map();

client.getLevel = function (xp) {
	let level = 0;
	let xpRequired = xpRequiredForNextLevel(level);

	while (xp >= xpRequired) {
		xp -= xpRequired;
		level++;
		xpRequired = xpRequiredForNextLevel(level);
	}

	return level;
};
function xpRequiredForNextLevel(level) {
	return Math.floor(10 + 5 * level ** 1.3);
}

// Error Handling
process.on("uncaughtException", (err) => {
	console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("[FATAL] Possibly Unhandled Rejection at: Promise", promise, "\nreason:", reason.message);
});

// Login Discord Bot Token
client.login(process.env.TOKEN);
