module.exports = {
	name: "mute",
	category: "Mod",
	description: "omg shut up",
	ownerOnly: false,
	options: [{
		name: 'victim',
		description: 'Who\'s the one being naughty',
		type: 'USER',
		required: true
	}, {
		name: 'reason',
		description: 'Why are you muting said user?',
		type: 'STRING',
		required: false
	}],
	version: "1",
	run: async (client, interaction) => {
		const member = interaction.options.getMember("victim")
		const reason = interaction.options.getString("reason") || "No Reason"
		if (interaction.member.permissions.has("MODERATE_MEMBERS")) {
      console.error(interaction.user.username + ' : ' + reason)
      try {
        await member.timeout(43200000, {
          reason: interaction.user.username + ' : ' + reason
        })
        interaction.reply({
          content: 'I have muted ' + member.user.username,
          ephemeral: true,
        });
      } catch (e) {
        console.error(error)
        interaction.reply({
          content: 'I do not have the right permisions to mute said user.',
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({
        content: client.config.permisionerror,
        ephemeral: true,
      });
    }
	},
};