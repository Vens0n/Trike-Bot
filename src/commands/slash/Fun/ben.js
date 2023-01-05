const Discord = require('discord.js');

module.exports = {
    name: "ben",
    category: "Fun",
  	options: [{
  		name: 'question',
  		description: 'Ask him something :)',
  		type: 'STRING',
  		required: true
  	}],
    description: "My Talking Ben",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

		  const question = interaction.options.getString("question");
      var choices = ["yes.", "no.", "ho ho ho", "blehh", "ben?"]
      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle('Ben?')
          .setColor(client.config.embedColor)
          .setDescription("```\n>> " + question + "\n<< " + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};