const Topgg = require(`@top-gg/sdk`)
const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NTcxODkyMTI3NTUxMDgxNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU1NjcyNzg2fQ.N3RRA6BqVti9K3qZf3I3cN4MFVHQ6pe5XpqfGFYvORg')

module.exports = {
     name: "allvotes",
     category: "hidden",
     description: "Get All Votes",
     ownerOnly: true,
     run: async (client, message, args) => {
       const voters = await api.getVotes()
       var output = []
       voters.forEach( user => {
         output.push(user.username)
       })
       try {
         message.reply({embeds: [{
           title: "Voted",
           color: "ff0000",
           description: "Voters: " + output.join(", "),
           footer: {
               text: client.config.embedfooterText,
               icon_url: message.guild.iconURL({
                   dynamic: false
               })
           }
         }]})
       } catch(err) {
         console.error(err)
         console.log("Voters: " + output.join(", "))
       }
     },
 };
