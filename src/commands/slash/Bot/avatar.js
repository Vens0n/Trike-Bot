module.exports = {
     name:  "avatar" ,
     usage: 'avatar [@user || user_id]',
     options: [
         {
             name: 'avatar',
             description: 'The user of the pfp you are grabbing',
             type: 'USER',
             required: true
         }
     ],
     category:  "Bot" ,
     description:  "Who is this guy?" ,
     ownerOnly: false,
     version: "1",
     run: async (client, interaction) => {
       const member = interaction.options.getMember("avatar")
       interaction.reply({embeds: [{
         title:  "Avatar" ,
         color:  client.config.embedColor,
         description:  "<@" + member.id + ">'s Avatar",
          image : {
            url : member.user.avatarURL({ size: 1024, dynamic: true })
         },
         footer: {
             text: client.config.embedfooterText,
             icon_url: interaction.guild.iconURL({
                 dynamic: false
             })
         }
       }]})
     },
 };
