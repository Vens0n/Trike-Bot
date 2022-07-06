const talkedRecently = new Set();

module.exports = {
    name: "server",
    aliases: ["serv"],
    category: "Bot",
    description: "Join Our Discord!",
    ownerOnly: false,
    run: async (client, message, args) => {

        console.log(message.guild)
        const user = message.author;

        message.channel.send({embeds: [{
      "title": `Server`,
      "url": "https://discord.gg/vufvnbdRa7",
      "description": "https://discord.gg/vufvnbdRa7",
      "color": "ff0000",
      "footer": {
        "text": client.footerText,
      }
    }]})

    },
};
