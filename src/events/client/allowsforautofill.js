const cooldowns = new Map();

module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isAutocomplete()) {
            const command = client.slash.get(interaction.commandName);
            if (!command) return
            try {
                command.autocomplete(client, interaction);
            } catch (e) {
                console.error(e)
            }
        }
    }
}