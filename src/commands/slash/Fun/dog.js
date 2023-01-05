const https = require('https');

module.exports = {
    name: "dog",
    aliases: ["woof"],
    category: "Fun",
    description: ":dog:",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {
      https.get(` https://dog.ceo/api/breeds/image/random`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response) interaction.reply("We couldn't get no woof :(")
          console.log(response)
          interaction.reply({embeds: [{
            title:  "Dog :dog:" ,
            color:  client.config.embedColor ,
             image : {
               url : response.message
            },
            footer: {
                text: client.config.embedfooterText,
            }
          }]})
        })
      })
    },
};
