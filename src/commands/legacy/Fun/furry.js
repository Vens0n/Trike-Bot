const https = require('https');

module.exports = {
    name: "furry",
    aliases: ["uwu", "jackson", "fuwwy"],
    category: "Fun",
    description: "x3 nuzzles, pounces on you, uwu you so warm",
    ownerOnly: false,
    run: async (client, message, args) => {
      https.get(`https://v2.yiff.rest/furry/hug`, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
          if(!response.success) message.reply("We couldn't get no uwu :(\n`" + response.error + "`")
          console.log(response)
          message.reply({embeds: [{
            title:  "Dog :dog:" ,
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
