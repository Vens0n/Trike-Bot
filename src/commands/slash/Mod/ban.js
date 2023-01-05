module.exports = {
	name: "ban",
	category: "Mod",
	usage: '..ban @username',
	description: "Let the hammer speak",
	ownerOnly: false,
	options: [{
		name: 'victim',
		description: 'Who\'s the one being naughty',
		type: 'USER',
		required: true
	}, {
    name: 'reason',
    description: 'Why are you banning said user?',
    type: 'STRING',
    required: false
  }],
  version: "1",
  run: async (client, interaction) => {
    const member = interaction.options.getMember("victim")
    const reason = interaction.options.getString("reason") || "No Reason"
		if (interaction.member.permissions.has("BAN_MEMBERS")) {
			async function dothis() {
				try {
          member.ban({days: 1, reason: interaction.member.username + ' : ' + reason})
					interaction.reply({
    				content: 'I have banned ' + member.user.username,
    				ephemeral: true,
    			});
				} catch (error) {
					console.error(error)
					interaction.reply({
    				content: 'I do not have the right permisions to ban said user.',
    				ephemeral: true,
    			});
				}
			}
			dothis()
		} else {
			interaction.reply({
				content: client.config.permisionerror,
				ephemeral: true,
			});
		}
	},
};
