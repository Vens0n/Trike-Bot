const Discord = require('discord.js');

module.exports = {
    name: "pp",
    aliases: ["dik"],
    category: "Fun",
    description: "Pull out that ruler.",
    ownerOnly: false,
    run: async (client, message, args) => {

      var choices = ["8D", "8D", "8=D", "8==D", "8==D", "8==D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8====D", "8====D", "8====D", "8====D", "8====D", "8=====D", " "]
      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle("pp size")
          .setColor(client.config.embedColor)
          .setDescription(message.author.username + "'s dick size: \n```\n" + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
