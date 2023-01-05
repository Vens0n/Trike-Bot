const os = require('os');

module.exports = {
    name: "info",
    category: "Bot",
    description: "Check in on some important stats.",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {
      const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
      const ToTalSeconds = (client.uptime / 1000);
      const Days = Math.floor(ToTalSeconds / 86400);
      const Hours = Math.floor(ToTalSeconds / 3600);
      const Minutes = Math.floor(ToTalSeconds / 60);
      const Seconds = Math.floor(ToTalSeconds % 60);
      const embed = new client.discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle("Trike Bot's Live Status")
        .addFields(
          {name: " \u200B ", value: "**Channels** : ` " + `${client.channels.cache.size}` + " `"},
          {name: " \u200B ", value: "**Servers** : ` " + `${client.guilds.cache.size}` + " `"},
          {name: " \u200B ", value: "**Users** : ` " + `${client.users.cache.size}` + " `"},
          {name: " \u200B ", value: "**Uptime** : ` " + `${Hours} Hours` + " `"},
          {name: " \u200B ", value: "**Free Mem** : ` " + `${prctfreeram}%` + " `"},
        )
        .setColor(client.config.embedColor)
        .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
