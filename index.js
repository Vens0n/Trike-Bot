console.clear();
console.debug(`Booting up…`);

const { QuickDB } = require("quick.db");
const db = new QuickDB()

const Discord = require('discord.js');
const { Client, Collection, Intents } = Discord;
const handler = require("./src/handlers/index");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});


// Call .env file to get Token
require('dotenv').config();

// Global Variables
client.discord  = Discord;
client.commands = new Collection();
client.slash    = new Collection();
client.config   = require('./config');
client.cwd      = require('process').cwd(); // require('path').resolve(``);

module.exports = client;

// Records commands and events
handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

// Error Handling
process.on("uncaughtException", (err) => {
    console.error('Uncaught Exception:', err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("[FATAL] Possibly Unhandled Rejection at: Promise", promise, "\nreason:", reason.message);
});

// Login Discord Bot Token
client.login(process.env.TOKEN);





// HIVEMIND




client.on("messageCreate", async message => {
    if(message.channel.id != "975508455563595846") return
    if(message.content != "👍") return
    if(!message.member.roles.cache.some(role => role.id === '1009675922103869490')) return
    const mentioned = message.mentions.members.first()
    if(!mentioned) return
    await mentioned.roles.add("975851370777292811")
    console.log(message.reference.messageId)
    const channel = client.channels.cache.get(`975508455563595846`);
    const themessage = await channel.messages.fetch(message.reference.messageId);
    await themessage.react("👍")
  })