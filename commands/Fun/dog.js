const https = require('https');

module.exports = {
    name: "dog",
    aliases: ["woof"],
    category: "Fun",
    description: ":dog:",
    ownerOnly: false,
    run: async (client, message, args) => {
      https.get(` https://dog.ceo/api/breeds/image/random`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response) message.reply("We couldn't get no woof :(")
          console.log(response)
          message.reply({embeds: [{
            title:  "Dog :dog:" ,
            color:  "ff0000" ,
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
