const Topgg = require(`@top-gg/sdk`)
const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NTcxODkyMTI3NTUxMDgxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU1NjcyNzg2fQ.N3RRA6BqVti9K3qZf3I3cN4MFVHQ6pe5XpqfGFYvORg')

module.exports = {
     name: "vote",
     usage: '..user [@user || user_id]',
     category: "Bot",
     description: "Who is this guy?",
     ownerOnly: false,
     run: async (client, message, args) => {
       var user = message.mentions.users.first() || message.member
       var didvote = await api.hasVoted(user.id)
       if(didvote) {
         didvote = "did vote, thank you <3"
       } else {
         didvote = "did not vote, vote [here](https://top.gg/bot/985718921275510814/vote)"
       }
       message.reply({embeds: [{
         title: "Voted",
         color: "ff0000",
         description: "<@" + user.id + "> " + didvote,
         footer: {
             text: client.config.embedfooterText,
             icon_url: message.guild.iconURL({
                 dynamic: false
             })
         }
       }]})
     },
 };
