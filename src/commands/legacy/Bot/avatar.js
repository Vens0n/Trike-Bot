module.exports = {
     name:  "avatar" ,
     aliases: ["a", "pfp"],
     usage: '..avatar [@user || user_id]',
     category:  "Bot" ,
     description:  "Who is this guy?" ,
     ownerOnly: false,
     run: async (client, message, args) => {
       const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
       message.reply({embeds: [{
         title:  "Avatar" ,
         color:  "ff0000" ,
         description:  "<@" + member.id + ">'s Avatar",
          image : {
            url : member.user.avatarURL({ size: 1024, dynamic: true })
         },
         footer: {
             text: client.config.embedfooterText,
             icon_url: message.guild.iconURL({
                 dynamic: false
             })
         }
       }]})
     },
 };
