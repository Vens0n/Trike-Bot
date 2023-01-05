const https = require('https');

module.exports = {
    name: "cat",
    aliases: ["meow"],
    category: "Fun",
    description: ":cat:",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {
      https.get(`https://api.thecatapi.com/v1/images/search`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response) interaction.reply("We couldn't get no meow :(")
          console.log(response)
          interaction.reply({embeds: [{
            title:  "Cat :cat:" ,
            color:  client.config.embedColor ,
             image : {
               url : response[0].url
            },
            footer: {
                text: client.config.embedfooterText,
            }
          }]})
        })
      })
    },
};
