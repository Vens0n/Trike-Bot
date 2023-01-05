const { QuickDB } = require("quick.db");

module.exports = {
    name: "leavemessage",
    category: "Utility",
    description: "What to say when someone leaves",
    ownerOnly: false,
    options: [{
      name: 'leavemessage',
      description: 'What should I say as someone leaves',
      type: 'STRING',
      required: false
    }],
    version: "1",
    run: async (client, interaction) => {
      const db = new QuickDB()
      const msg = interaction.options.getString("leavemessage");

      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        interaction.reply({
          content: client.config.permisionerror,
          ephemeral: true,
        });
        return;
      }

      if(!msg) {
        await db.set(`leavemessage_${interaction.guild.id}`, 0)
        interaction.reply("Removed the message given when a user leaves.")
        return
      }

      var leavemessagepreview = msg
      leavemessagepreview = leavemessagepreview.replace("{username}", interaction.user.username)
      leavemessagepreview = leavemessagepreview.replace("{userping}", `<@${interaction.user.id}>`)


      if(msg) {
        await db.set(`leavemessage_${interaction.guild.id}`, msg)
        await interaction.reply(`When a user leaves, i will now say, ${leavemessagepreview}`)
      }

      if(!msg.includes("{username}") && !msg.includes("{userping}")) {
        interaction.followUp({
          embeds: [{
            title:  "Pro Tip:" ,
            description: `When making a welcome/leave message, you can have mentions such as <@${interaction.user.id}>!\nYou can use messages such as \`Everyone, welcome {username} to our server!\` and it will output \`Everyone, welcome ${interaction.user.username} to our server!\`\n\n\`\`\`\n{username} - ${interaction.user.username}\n{userping} - <@${interaction.user.id}>\n\`\`\``,
            color:  client.config.embedColor ,
            footer: {
              text: client.config.embedfooterText,
              iconURL: `${client.user.displayAvatarURL()}` 
            }
          }],
          content: "Tip:",
          ephemeral: true,
        });
        return;
      }
    },
};
