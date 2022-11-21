const https = require('https');
const Discord = require('discord.js');
const memes = ["meme", "tihi", "dankmemes", "funny", "wholesomememes", "comedymemes", "sbubby"]

module.exports = {
    name: "choice",
    aliases: ["pick"],
    usage: '..choice choice a|choice b|choice c',
    category: "Fun",
    description: "I will pick from one of your choices",
    ownerOnly: false,
    run: async (client, message, args) => {

      if(!args[0]) return message.reply("```\n..choice choice a|choice b|choice c\n```")
      var wholemsg = args.join(" ")
      var choices = wholemsg.split("|")
      const choice = choices[Math.floor(Math.random() * choices.length)]
      if(!choice) return message.reply("```\n..choice choice a|choice b|choice c\n```")
      const embed = new client.discord.MessageEmbed()
          .setTitle('Choice')
          .setColor(client.config.embedColor)
          .setDescription("I pick: \n```\n" + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
