const os = require('os');

module.exports = {
    name: "info",
    aliases: ["bot"],
    category: "Bot",
    description: "How we be doing",
    ownerOnly: false,
    run: async (client, message, args) => {
      const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
      const ToTalSeconds = (client.uptime / 1000);
      const Days = Math.floor(ToTalSeconds / 86400);
      const Hours = Math.floor(ToTalSeconds / 3600);
      const Minutes = Math.floor(ToTalSeconds / 60);
      const Seconds = Math.floor(ToTalSeconds % 60);
      const embed = new client.discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle("Trike Bot's Live Status")
        .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
        .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
        .addField(" \u200B ", "**Users** : ` " + `${client.users.cache.size}` + " `")
        .addField(" \u200B ", "**Uptime** : ` " + `${Hours} Hours` + " `")
        .addField(" \u200B ", "**Free Mem** : ` " + `${prctfreeram}%` + " `")

      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
