const { QuickDB } = require("quick.db");
const { ApplicationCommandOptionType } = require('discord.js');

const inventoryDB = new QuickDB({ filePath: "DB/inventory.sqlite" });
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });

module.exports = {
    name: "use",
    description: "Use something from your inventory.",
    type: 1,
    options: [
        {
            name: "item",
            description: "What do you wish to use?",
            type: ApplicationCommandOptionType.String,
            autocomplete: true,
            required: true,
        },
    ],
    autocomplete: async (client, interaction) => {
        try {
            const inventory = await inventoryDB.get(`inventory_${interaction.user.id}`) || [];
            const focusedValue = interaction.options.getFocused();
            const filtered = Object.values(inventory)
                .filter(i => i.name.toLowerCase().startsWith(focusedValue.toLowerCase()))
                .slice(0, 20); // up to 25 allowed

            if (!interaction.responded) {
                await interaction.respond(
                    filtered.map(i => ({
                        name: `${i.amount}x ${i.name}`,
                        value: i.name
                    }))
                );
}

        } catch (err) {
            console.error("Autocomplete error:", err);

            if (!interaction.responded) {
                await interaction.respond([]);
            }
        }
    },

    execute: async (client, interaction) => {
  		var input = interaction.options.getString("item");
        var inventory = await inventoryDB.get(`inventory_${interaction.user.id}`) || [];
        const item = Object.values(inventory).find(i => i.name.toLowerCase() === input.toLowerCase());
        if (!item) {
            return interaction.reply({
                content: `You do not have a **${input}** in your inventory.`,
                ephemeral: true
            });
        }
        const itemfromshop = client.shop.items.find(i => i.name.toLowerCase() === item.name.toLowerCase());
        if (!itemfromshop || !itemfromshop.use) {
            return interaction.reply({
                content: `You cannot use **${item.name}**.`,
                ephemeral: true
            });
        }
        try {
            itemfromshop.use(client, interaction, inventory);
        } catch (error) {
            console.error("Error using item:", error);
            return interaction.reply({
                content: `There was an error trying to use **${item.name}**. Please try again later.`,
                ephemeral: true
            });
        }
    }}