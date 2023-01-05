const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    aliases: ["8"],
    category: "Fun",
  	options: [{
  		name: 'question',
  		description: 'Let me be your destiny',
  		type: 'STRING',
  		required: true
  	}],
    description: "Magic 8 Ball",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

		  const question = interaction.options.getString("question");
      var choices = ["yes", "no", "im not sure on that", "you can make anything happen", "ben?", "i guess so", "maybe, im not to sure", "for sure", "wtf no", "hell no, why did you even ask!? smh", "null", "ask someone else", "yea, sure", "go for it!", "definitely", "posibly", "bro i don't fucking know lmao!?", "oh yea, for sure", "Oh yea, Trike Bot Aproves", "Ehh, maybe, but im not to sure on that", "The what!??", "lmao hell nah, you gotta be joking", "your such a clown lmao, hell no", "y e s", "*nods head up and down*", "yep!", "ermmm, sure?"]
      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle('8 Ball')
          .setColor(client.config.embedColor)
          .setDescription("```\n>> " + question + "\n<< " + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
