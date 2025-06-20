const { QuickDB } = require("quick.db");
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const inventoryDB = new QuickDB({ filePath: "DB/inventory.sqlite" });
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });

module.exports = {
    name: "shop",
    description: "Time to really throw yourself into this economy",
    type: 1,
    execute: async (client, interaction) => {

		const wallet = (await moneyDB.get(`wallet_${interaction.user.id}`)) || 0;
        const deal = client.shop.deal;
        const inventory = await inventoryDB.get(`inventory_${interaction.user.id}`) || [];
        const shopitems = client.shop.items.filter(item => item.avaliable);
        if (shopitems.length === 0) {
            return interaction.reply({content: "No items available in the shop at the moment. You shouldn't ever see this message btw.", ephemeral: true});
        }

        const currentPage = 0;
        const itemsPerPage = 6;
        const pageItems = shopitems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

        // Show only the first 6 items on the shop page
        var embed = new EmbedBuilder()
            .setTitle("Shop")
            .setDescription(`Welcome to the shop! Here are the available items:`) //\n
            .addFields(
                pageItems.map(item => ({
                    name: `${item.emoji}-  **${item.name}**`,
                    value: `Price: $${(item.price * deal).toFixed(2)}\n${item.description}`,
                    inline: true
                })))
            .setColor(client.config.embedColor())
            .setFooter({ text: `You have $${wallet.toFixed(2)} in your wallet.`, iconURL: client.user.displayAvatarURL() });

        // Show buttons to skip pages and an input bar to buy items
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("shop_select")
            .setPlaceholder("Select an item")
            .addOptions(
                pageItems.map(item => ({
                    label: item.name,
                    description: item.description.slice(0, 50),
                    value: item.name.toLowerCase().replace(/\s+/g, "_"),
                    emoji: item.emoji
                }))
            );

        const selectRow = new ActionRowBuilder().addComponents(selectMenu);

        // Navigation buttons
        const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('shop_prev')
                .setLabel('Previous')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage === 0), // Disable if on first page

            new ButtonBuilder()
                .setCustomId('shop_next')
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(shopitems.length <= itemsPerPage) // Disable if only 1 page
        );


        
        var shopMsg = await interaction.reply({
            embeds: [embed],
            components: [selectRow, buttonRow],
            ephemeral: false
        });

		// Create collector
		const collectorFilter = (i) => i.user.id === interaction.user.id;
		try {
			const selection = await shopMsg.awaitMessageComponent({ filter: collectorFilter, time: 15000 });

			if (selection.customId === "shop_select") {
				const chosenItem = selection.values[0]; // This is the value from the select menu
                // Make sure the user has enough money to buy the item
                const item = shopitems.find(i => i.name.toLowerCase().replace(/\s+/g, "_") === chosenItem);
                if (!item) {
                    const embeddedError = new EmbedBuilder()
                        .setTitle("Shop:; Error")
                        .setDescription("This item is not available in the shop.")
                        .setFooter({ text: "This shouldn't happen btw,,," })
                        .setColor(client.config.embedColor());
                    return interaction.editReply({ embeds: [embeddedError], components: [] });
                }
                const itemPrice = item.price * deal;
                
                if (wallet < itemPrice) {
                    const embeddedError = new EmbedBuilder()
                        .setTitle("Shop: Error")
                        .setDescription(`You don't have enough money to buy this item!\nYou have $${wallet.toFixed(2)}, but the item costs $${itemPrice.toFixed(2)}.`)
                        .setFooter({ text: "Poor" })
                        .setColor(client.config.embedColor());
                    return interaction.editReply({ embeds: [embeddedError], components: [] });                }

                var pass = true
                
                const itemData = inventory[item.name] || { amount: 0 };
                const amountofitemalready = itemData.amount;
                // CUSTOM CHECKS

                if (item.extradata.max) {
                    // Check if the user already has the maximum amount of this item
                    console.log(`Amount of ${item.name} already in inventory: ${amountofitemalready}`);
                    if (amountofitemalready >= item.extradata.max) {

                    const embeddedError = new EmbedBuilder()
                        .setTitle("Shop: Error")
                        .setDescription(`You already have the maximum amount of this item (${item.extradata.max}).`)
                        .setFooter({ text: ":(" })
                        .setColor(client.config.embedColor());
                    interaction.editReply({ embeds: [embeddedError], components: [] });
                    pass = false
                    }
                }
                

				console.log(`${interaction.user.username} selected to buy: ${chosenItem}`);
				
                if (pass === false) return;

                if (amountofitemalready === 0) {
                    console.log("YUou dont yeyt own this")
                    inventory.push({
                        name: item.name,
                        emoji: item.emoji,
                        amount: 1,
                        description: item.description,
                        price: item.price,
                        extradata: item.extradata
                    });
                    
                } else {
                    inventory[item.name].amount += 1;
                }
                await inventoryDB.set(`inventory_${interaction.user.id}`, inventory);
                await moneyDB.set(`wallet_${interaction.user.id}`, wallet - itemPrice);

                const embeddedError = new EmbedBuilder()
                    .setTitle("Shop")
                    .setDescription(`Yay! You bought **${item.name}** for $${itemPrice.toFixed(2)}!\n\nYou now have $${(wallet - itemPrice).toFixed(2)} left in your wallet.\nYou own ${amountofitemalready + 1} of this item.`)
			        .setFooter({ text: client.config.embedfooterText, iconURL: interaction.user.displayAvatarURL() })
                    .setColor(client.config.embedColor());
                return interaction.editReply({ embeds: [embeddedError], components: [] }); 
			}
		} catch (err) {
            console.log("Error in shop interaction:", err);
			await interaction.editReply({ content: "No selection was made in time, shop closed.", embeds: [], components: [] });
		}
    },
};
