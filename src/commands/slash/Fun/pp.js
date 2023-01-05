const Discord = require('discord.js');

module.exports = {
    name: "pp",
    aliases: ["8"],
    category: "Fun",
    description: "Ok weirdo, check your dick size",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

      var choices = ["8D", "8D", "8=D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8====D", "8====D", "8====D", "8====D", "8====D", "8=====D", "8==========D"]
      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle('Dick!?')
          .setColor(client.config.embedColor)
          .setDescription("```\n" + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
