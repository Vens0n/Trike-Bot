
module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.slash.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'an Error check console' });

            let isowner = false
            
            client.config.ownerIDs.forEach(id => {
                if (interaction.user.id === id) {
                    isowner = true
                }
            })
            
            if (command.ownerOnly && !isowner) return

            const args = [];

            for (let option of interaction.options.data) {
                if (option.type === 'SUB_COMMAND') {
                    if (option.name) args.push(option.name);
                    option.options?.forEach(x => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }

            try {
                command.run(client, interaction, args);
            } catch (e) {
                interaction.reply({ content: e.message });
            }
        }
        
        if(interaction.isUserContextMenu()) {
            
        }
    }
}
