const https = require('https');

module.exports = {
    name: "cat",
    aliases: ["meow"],
    category: "Fun",
    description: ":cat:",
    ownerOnly: false,
    run: async (client, message, args) => {
      https.get(`https://api.thecatapi.com/v1/images/search`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response) message.reply("We couldn't get no meow :(")
          console.log(response)
          message.reply({embeds: [{
            title:  "Cat :cat:" ,
            color:  "ff0000" ,
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
