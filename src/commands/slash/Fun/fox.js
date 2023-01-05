const https = require('https');

module.exports = {
    name: "fox",
    aliases: ["fluff"],
    category: "Fun",
    description: ":fox:",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {
      https.get(`https://randomfox.ca/floof/`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response) interaction.reply("We couldn't get no fluff :(")
          console.log(response)
          interaction.reply({embeds: [{
            title:  "Fox :fox:" ,
            color:  client.config.embedColor ,
             image : {
               url : response.image
            },
            footer: {
                text: client.config.embedfooterText,
            }
          }]})
        })
      })
    },
};
