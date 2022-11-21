const gTTS = require('gtts');
const Topgg = require(`@top-gg/sdk`)
const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NTcxODkyMTI3NTUxMDgxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU1NjcyNzg2fQ.N3RRA6BqVti9K3qZf3I3cN4MFVHQ6pe5XpqfGFYvORg')
const Discord = require('discord.js');

module.exports = {
    name: "tts",
    aliases: ["text"],
    category: "Fun",
    description: "Google Text To Speech",
    ownerOnly: false,
    run: async (client, message, args) => {
      var user = message.member
      var didvote = await api.hasVoted(user.id)
      if(!didvote) return message.reply("This is a vote only command as its stressfull to use\n..vote")
      var choices = ["1", "2", "3", "4", "5", "6", "7"]
      const choice = choices[Math.floor(Math.random() * choices.length)]
      if(!args[0]) return message.reply("You must have some text to turn into audio!")
      if(args.join(" ") >= 500) return message.reply("Keep it shorter than 500 character for the sake of me! >:(")
      var gtts = new gTTS(args.join(" "), 'en');
      gtts.save('../../tmp' + choice + '.mp3', function (err, result) {
        if(err) { message.reply("something went wrong :flushed:") }
        message.reply({ content: "Here is your audio :)", files: ["../../tmp" + choice + ".mp3"]})
      });


    },
};
