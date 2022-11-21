const os = require('os');

module.exports = {
    name: "invite",
    category: "Bot",
    description: "Get a link to let me join your server",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

      const row = new client.discord.MessageActionRow()
          .addComponents(
              new client.discord.MessageButton()
                  .setLabel("Invite")
                  .setStyle("LINK")
                  .setURL("https://discord.com/api/oauth2/authorize?client_id=985718921275510814&permissions=249645362241&scope=bot"),
              new client.discord.MessageButton()
                  .setLabel("Support")
                  .setStyle("LINK")
                  .setURL("https://discord.gg/vufvnbdRa7")
          );
      const embed = new client.discord.MessageEmbed()
        .setColor(client.config.embedColor)
        .setTitle("Trike Bot :D")
        .setDescription("You can use one or both of the buttons below")
        .setColor(client.config.embedColor)
        .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, components: [row] });
    },
};
