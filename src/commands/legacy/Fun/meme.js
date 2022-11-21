const https = require('https');
const Discord = require('discord.js');
const memes = ["meme", "tihi", "dankmemes", "funny", "wholesomememes", "comedymemes", "sbubby"]

module.exports = {
    name: "meme",
    aliases: ["funny", "lol"],
    category: "Fun",
    description: "Get a small laugh in.",
    ownerOnly: false,
    run: async (client, message, args) => {
      const msg = await message.channel.send("Getting meme. . .")
      const meme = memes[Math.floor(Math.random() * memes.length)]
      https.get(`https://www.reddit.com/r/${meme}/hot/.json?limit=100`, (result) => {
          var body = ''
          result.on('data', (chunk) => {
              body += chunk
          })

          result.on('end', () => {
              var response = JSON.parse(body)
              var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

              if (index.post_hint !== 'image') {

                  var text = index.selftext
                  const textembed = new client.discord.MessageEmbed()
                      .setTitle(subRedditName)
                      .setColor("FF0000")
                      .setDescription(`[${title}](${link})\n\n${text}`)
                      .setURL(`https://reddit.com/${subRedditName}`)
                      .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                  message.channel.send({ embeds: [textembed] })
              }

              var image = index.preview.images[0].source.url.replace('&amp;', '&')
              var title = index.title
              var link = 'https://reddit.com' + index.permalink
              var subRedditName = index.subreddit_name_prefixed

              if (index.post_hint !== 'image') {
                  const textembed = new client.discord.MessageEmbed()
                      .setTitle(subRedditName)
                      .setColor("FF0000")
                      .setDescription(`[${title}](${link})\n\n${text}`)
                      .setURL(`https://reddit.com/${subRedditName}`)
                      .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });


                  message.channel.send({ embeds: [textembed] })
              }
              const imageembed = new client.discord.MessageEmbed()
                  .setTitle(subRedditName)
                  .setImage(image)
                  .setColor("FF0000")
                  .setDescription(`[${title}](${link})`)
                  .setURL(`https://reddit.com/${subRedditName}`)
                  .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

              message.channel.send({ embeds: [imageembed] })
              msg.delete();
          }).on('error', function (e) {
              console.log('Got an error: ', e)
              message.reply("I failed to do so :(\nrun me again")
              msg.delete();

          })
      })

    },
};
