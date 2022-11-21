const https = require('https');
const Discord = require('discord.js');
const memes = ["meme", "tihi", "dankmemes", "funny", "wholesomememes", "comedymemes", "sbubby"]

module.exports = {
    name: "8ball",
    aliases: ["8"],
    category: "Fun",
    description: "Magic 8 Ball",
    ownerOnly: false,
    run: async (client, message, args) => {

      if(!args[0]) return message.reply("*cough* \"..8ball am i dumb\"")
      var choices = ["yes", "no", "im not sure on that", "you can make anything happen", "ben?", "i guess so", "maybe, im not to sure", "for sure", "wtf no", "hell no, why did you even ask!? smh", "null", "ask someone else", "yea, sure", "go for it!", "definitely"]
      const choice = choices[Math.floor(Math.random() * choices.length)]

      const embed = new client.discord.MessageEmbed()
          .setTitle('8 Ball')
          .setColor(client.config.embedColor)
          .setDescription("```\n>> " + args.join(" ") + "\n<< " + choice + "\n```")
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    },
};
