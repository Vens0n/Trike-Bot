const { QuickDB } = require("quick.db");
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const inventoryDB = new QuickDB({ filePath: "DB/inventory.sqlite" });
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });

module.exports = {
    name: "inventory",
    description: "What do you have on you?",
    type: 1,
    execute: async (client, interaction) => {
        var wallet = (await moneyDB.get(`wallet_${interaction.user.id}`)) || 0;
        var inventory = await inventoryDB.get(`inventory_${interaction.user.id}`) || [];
        
        const items = Object.values(inventory)

        const embed = new EmbedBuilder()
                    .setTitle("Your Inventory")
                    .setDescription(`You have $${wallet.toFixed(2)} in your wallet.`)
                    .addFields(
                        items.length > 0
                            ? items.map(item => ({
                                name: `${item.emoji} ${item.name}: ${item.amount}`,
                                value: `${item.description}`,
                                inline: true
                            }))
                            : { name: "No items", value: "Your inventory is empty." }
                    )
                    .setColor(client.config.embedColor())
                    .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL() })

        interaction.reply({
            embeds: [
                embed
            ],
            ephemeral: false
        });
    }}