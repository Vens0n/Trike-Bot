const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: "choice",
    aliases: ["pick"],
    usage: '..choice choice a|choice b|choice c',
    category: "Fun",
  	options: [{
  		name: 'choice1',
  		description: 'Choice 1',
  		type: 'STRING',
  		required: true
  	}, {
  		name: 'choice2',
  		description: 'Choice 2',
  		type: 'STRING',
  		required: true
  	}, {
  		name: 'choice3',
  		description: 'Choice 3',
  		type: 'STRING',
  		required: false
  	}, {
  		name: 'choice4',
  		description: 'Choice 4',
  		type: 'STRING',
  		required: false
  	}, {
  		name: 'choice5',
  		description: 'Choice 5',
  		type: 'STRING',
  		required: false
  	}, {
  		name: 'choice6',
  		description: 'Choice 6',
  		type: 'STRING',
  		required: false
  	}, {
  		name: 'choice7',
  		description: 'Choice 7',
  		type: 'STRING',
  		required: false
  	}],
    description: "I will pick from one of your choices",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

      const choice1 = interaction.options.getString("choice1");
      const choice2 = interaction.options.getString("choice2");
      const choice3 = interaction.options.getString("choice3");
      const choice4 = interaction.options.getString("choice4");
      const choice5 = interaction.options.getString("choice5");
      const choice6 = interaction.options.getString("choice6");
      const choice7 = interaction.options.getString("choice7");

      var choices = []

      choices.push(choice1)
      choices.push(choice2)
      if(choice3) choices.push(choice3)
      if(choice4) choices.push(choice4)
      if(choice5) choices.push(choice5)
      if(choice6) choices.push(choice6)
      if(choice7) choices.push(choice7)

      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle('Ben?')
          .setColor(client.config.embedColor)
          .setDescription("I pick:\n" + choice)
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
