const {
	QuickDB
} = require("quick.db");
module.exports = {
	name: "snipe",
	category: "Mod",
	description: "Catch someone in the red",
	ownerOnly: false,
	version: "1",
	run: async (client, interaction) => {
		const db = new QuickDB()
		if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
			interaction.reply({
				content: client.config.permisionerror,
				ephemeral: true,
			});
			return;
		}
    var message = await db.get(`snipestorage_${interaction.channel.id}`)
    if(!message) {
      interaction.reply({
        content: 'There hasn\'t been any sniped messages here-\nsowwy about that 🥺',
        ephemeral: true,
      });
      return;
    }
		const snipeEmbed = new client.discord.MessageEmbed()
			.setTitle(`Sniped Message`)
			.addFields({
				name: "Author",
				value: `<@${message.authorId}>`
			}, {
				name: "Content",
				value: `${message.content || "[EMBED/MEDIA]"}`
			}, {
				name: "Timestamp",
				value: `<t:${(message.createdTimestamp/1000).toFixed(0)}>`
			}, {
				name: "Type",
				value: message.type
			}, )
			.setColor(client.config.embedColor)
			.setFooter({
				text: `${client.config.embedfooterText}`,
				iconURL: `${client.user.displayAvatarURL()}`
			});
		interaction.reply({ embeds: [snipeEmbed], allowedMentions: { repliedUser: false } })
	},
};