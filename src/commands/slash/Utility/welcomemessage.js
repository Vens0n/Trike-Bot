const { QuickDB } = require("quick.db");

module.exports = {
    name: "welcomemessage",
    category: "Utility",
    description: "What to say when someone join",
    ownerOnly: false,
    options: [{
      name: 'joinmessage',
      description: 'What should I say as someone joins',
      type: 'STRING',
      required: false
    }],
    version: "1",
    run: async (client, interaction) => {
      const db = new QuickDB()
      const msg = interaction.options.getString("joinmessage");

      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        interaction.reply({
          content: client.config.permisionerror,
          ephemeral: true,
        });
        return;
      }

      if(!msg) {
        await db.set(`joinmessage_${interaction.guild.id}`, 0)
        interaction.reply("Removed the message given when a user joins.")
        return
      }

      var joinmessagepreview = msg
      var givetips = true
      joinmessagepreview = joinmessagepreview.replace("{username}", interaction.user.username)
      joinmessagepreview = joinmessagepreview.replace("{userping}", `<@${interaction.user.id}>`)

      await db.set(`joinmessage_${interaction.guild.id}`, msg)
      await interaction.reply(`When a user joins, i will now say, ${joinmessagepreview}`)
      
      
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
