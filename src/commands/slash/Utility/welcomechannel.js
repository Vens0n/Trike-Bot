const { QuickDB } = require("quick.db");

module.exports = {
    name: "welcomechannel",
    aliases: ["autorole"],
    category: "Utility",
    description: "Suit up those new users!",
    ownerOnly: false,
    options: [{
      name: 'channel',
      description: 'What channel should I send welcome and/or leave messages to.',
      type: 'CHANNEL',
      required: false
    }],
    version: "1",
    run: async (client, interaction) => {

      const channel = interaction.options.getChannel("channel");

      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        interaction.reply({
          content: client.config.permisionerror,
          ephemeral: true,
        });
        return;
      }
      const db = new QuickDB()
      if(channel) {
        await db.set(`welcomechannel_${interaction.guild.id}`, channel.id)
        interaction.reply("Set messages to appear in <#" + channel.id + ">!")
      } else {
        await db.set(`welcomechannel_${interaction.guild.id}`, 0)
        interaction.reply("Removed welcome/leave messages!")
      }
    },
};
