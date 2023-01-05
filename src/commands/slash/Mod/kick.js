module.exports = {
	name: "kick",
	category: "Mod",
	description: "Kick them out of this place",
	ownerOnly: false,
	options: [{
		name: 'victim',
		description: 'Who\'s the one being naughty',
		type: 'USER',
		required: true
	}, {
    name: 'reason',
    description: 'Why are you kicking said user?',
    type: 'STRING',
    required: false
  }],
  version: "1",
  run: async (client, interaction) => {
    const member = interaction.options.getMember("victim")
    const reason = interaction.options.getString("reason") || "No Reason"
		if (interaction.member.permissions.has("KICK_MEMBERS")) {
			async function dothis() {
				try {
          member.kick(interaction.member.username + ' : ' + reason)
					interaction.reply({
    				content: 'I have kicked ' + member.user.username,
    				ephemeral: true,
    			});
				} catch (error) {
					console.error(error)
					interaction.reply({
    				content: 'I do not have the right permisions to kick said user.',
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
