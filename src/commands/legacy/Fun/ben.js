const https = require('https');
const Discord = require('discord.js');
const memes = ["meme", "tihi", "dankmemes", "funny", "wholesomememes", "comedymemes", "sbubby"]

module.exports = {
    name: "ben",
    aliases: ["ben?"],
    category: "Fun",
    description: "Ben?",
    ownerOnly: false,
    run: async (client, message, args) => {

      if(!args[0]) return message.reply("*puts phone down")
      var choices = ["yes.", "no.", "ho ho ho", "blehh", "ben?"]
      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle('Ben?')
          .setColor(client.config.embedColor)
          .setDescription("```\n>> " + args.join(" ") + "\n<< " + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
