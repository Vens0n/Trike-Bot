const https = require('https');

module.exports = {
    name: "fox",
    aliases: ["fluff"],
    category: "Fun",
    description: ":fox:",
    ownerOnly: false,
    run: async (client, message, args) => {
      https.get(`https://randomfox.ca/floof/`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response) message.reply("We couldn't get no fluff :(")
          console.log(response)
          message.reply({embeds: [{
            title:  "Fox :fox:" ,
            color:  "ff0000" ,
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
