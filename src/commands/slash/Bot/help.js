const { readdirSync } = require("fs");

// Example of how to make a Help SlashCommand

module.exports = {
    name: "help",
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: 'What command do you need help',
            type: 'STRING',
            required: false
        }
    ],
    category: "Bot",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

        const commandInt = interaction.options.getString("command");

            if (!commandInt) {

                // Get the commands of a Bot category
                const botCommandsList = [];
                readdirSync(`./src/commands/slash/Bot`).forEach((file) => {
                  console.log(file)
                    const filen = require(`../Bot/${file}`);
                    const name = `\`${filen.name}\``
                    botCommandsList.push(name);
                });

                // Get the commands of a Utility category
                const modorationCommandsList = [];
                readdirSync(`./src/commands/slash/Mod`).forEach((file) => {
                    const filen = require(`../Mod/${file}`);
                    const name = `\`${filen.name}\``
                    modorationCommandsList.push(name);
                });

                const funCommandsList = [];
                readdirSync(`./src/commands/slash/Fun`).forEach((file) => {
                    const filen = require(`../Fun/${file}`);
                    const name = `\`${filen.name}\``
                    funCommandsList.push(name);
                });

                const utilityCommandsList = [];
                readdirSync(`./src/commands/slash/Utility`).forEach((file) => {
                    const filen = require(`../Utility/${file}`);
                    const name = `\`${filen.name}\``
                    utilityCommandsList.push(name);
                });

                // This is what it commands when using the command without arguments
                const helpEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Help`)
                    .addFields(
                      {name: "🤖 - Bot Commands", value: botCommandsList.map((data) => `${data}`).join(", ")},
                      {name: "🎉 - Fun Commands", value: funCommandsList.map((data) => `${data}`).join(", ")},
                      {name: "👮 - Modoration Commands", value: modorationCommandsList.map((data) => `${data}`).join(", ")},
                      {name: "⚙️ - Utility Commands", value: utilityCommandsList.map((data) => `${data}`).join(", ")},
                    )
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false } });
            } else {
                const command = client.commands.get(commandInt.toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(commandInt.toLowerCase()));

                // This is what it sends when using the command with argument and it does not find the command
                if (!command) {
                    interaction.reply({ content: `There isn't any command named "${commandInt}"`, allowedMentions: { repliedUser: false } });
                } else {

                    // This is what it sends when using the command with argument and if it finds the command
                    let command = client.commands.get(commandInt.toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(commandInt.toLowerCase()));
                    let name = command.name;
                    let description = command.description || "No descrpition provided"
                    let usage = command.usage || "No usage provided"
                    let aliases = command.aliases || "No aliases provided"
                    let category = command.category || "No category provided!"

                    let helpCmdEmbed = new client.discord.MessageEmbed()
                        .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` Command`)
                        .addFields(
                            { name: "Description", value: `${description}`, inline: true },
                            { name: "Aliases", value: `${aliases}`, inline: true },
                            { name: 'Category', value: `${category}`, inline: true })
                        .setColor(client.config.embedColor)
                        .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                    interaction.reply({ embeds: [helpCmdEmbed], allowedMentions: { repliedUser: false } });
                }
            }


    },
};
