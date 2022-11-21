const Discord = require('discord.js')
module.exports = {
    name: "snipe",
    aliases: ["s"],
    category: "Mod",
    usage: '..snipe',
    description: "Catch someone in the red :eyes:",
    ownerOnly: false,
    run: async (client, message, args) => {
      const msg = client.snipes.get(message.channel.id)
      const embed = new Discord.MessageEmbed()
        .setAuthor(msg.author, msg.member.user.displayAvatarURL())
        .setDescription(msg.content)
        .setFooter('Get Sniped lol')
        .setTimestamp();
      message.channel.send(embed);
    },
};
