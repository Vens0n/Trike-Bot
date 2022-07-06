const talkedRecently = new Set();

module.exports = {
    name: "invite",
    aliases: ["link"],
    category: "Bot",
    description: "Let me in :)",
    ownerOnly: false,
    run: async (client, message, args) => {

        console.log(message.guild)
        const user = message.author;

        message.channel.send({embeds: [{
      "title": `Invite`,
      "url": "https://discord.com/api/oauth2/authorize?client_id=985718921275510814&permissions=249645362241&scope=bot",
      "description": "[Invite :sunglasses:](https://discord.com/api/oauth2/authorize?client_id=985718921275510814&permissions=249645362241&scope=bot)",
      "color": "ff0000",
      "footer": {
        "text": client.footerText,
      }
    }]})

    },
};
