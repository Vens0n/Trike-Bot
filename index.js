const { Client, Collection, Intents } = require('discord.js');
const handler = require("./handler/index");

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
    "allowedMentions": { parse: ['users', 'roles'] },
});

const Discord = require('discord.js');
// Call .env file to get Token
require('dotenv').config()

module.exports = client;

// Global Variables
client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config')
client.footerText = client.config.embedfooterText
// Records commands and events
handler.loadEvents(client);
handler.loadCommands(client);

const { AutoPoster } = require('topgg-autoposter')

AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NTcxODkyMTI3NTUxMDgxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU1NjcyNzg2fQ.N3RRA6BqVti9K3qZf3I3cN4MFVHQ6pe5XpqfGFYvORg', client)
  .on('posted', () => {
    console.log('Posted stats to Top.gg!')
  })

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
    client.channels.cache.get("985987655521148988").send({
        embeds: [{
            "title": `UNCAUGHT ERROR`,
            "description": "```\n.." + err + "\n```",
            "color": "ff0000"
        }],
        content: "<@638368326996983848>"
    })
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
    client.channels.cache.get("985987655521148988").send({
        embeds: [{
            "title": `FATAL ERROR`,
            "description": "```\n.." + reason.message + "\n```",
            "color": "ff0000"
        }],
        content: "<@638368326996983848>"
    })
});

// Login Discord Bot Token
client.login(process.env.TOKEN);
