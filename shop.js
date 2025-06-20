const { QuickDB } = require("quick.db");
const inventoryDB = new QuickDB({ filePath: "DB/inventory.sqlite" });
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });
module.exports = {
	deal: 1,
    items: [
        {
            name: "sock",
            description: "its musty and damp",
            price: 550,
            emoji: "🧦",
            avaliable: true,
            extradata: {
            },
            use: async function (client, interaction, inventory) {
                const thingstosay = [
                    "-username- used the sock.\n-10hp. The sock isn't edible.",
                    "-username- takes a peak at the sock\nIt's still a sock.",
                    "-username- takes a sniff. It disintigrates.",
                    "The sock is placed gently onto -username-'s head. gross."
                ];
                interaction.reply({
                    content: thingstosay[Math.floor(Math.random() * thingstosay.length)].replace("-username-", interaction.user.displayName),
                    ephemeral: false
                });

                inventory["sock"].amount -= 1;
                await inventoryDB.set(`inventory_${interaction.user.id}`, inventory);

            }

        },
        {
            name: "fop",
            description: "is fop?",
            price: 5750,
            emoji: "🦊",
            avaliable: true,
            extradata: {
                max: 1,
            },
            use: async function (client, interaction, inventory) {
                const thingstosay = [
                    "Pocket fox!! *-username- pet the fop*.",
                    "https://tenor.com/view/fox-smile-stare-snout-sniff-gif-27659776",
                    "Do no the fox.",
                ];
                interaction.reply({
                    content: thingstosay[Math.floor(Math.random() * thingstosay.length)].replace("-username-", interaction.user.displayName),
                    ephemeral: false
                });
            }
        },
        {
            name: "Northrop Grumman B-2 Spirit stealth bomber",
            description: "Silly little plane :33",
            price: 350000000,
            emoji: "💣",
            avaliable: true,
            extradata: {},
            use: async function (client, interaction, inventory) {
                interaction.reply({
                    content: "Why are you using a stealth bomber? You can't even fit it in your inventory.\nYou use it and crash it into the ground, destroying it and everything around you.\n-1 Northrop Grumman B-2 Spirit stealth bomber",
                    ephemeral: false
                });

                const index = inventory.findIndex(i => i.name.toLowerCase() === "Northrop Grumman B-2 Spirit stealth bomber".toLowerCase());
                if (index !== -1) {
                    inventory[index].amount -= 1;

                    // Remove item entirely if amount is 0
                    if (inventory[index].amount <= 0) {
                        inventory.splice(index, 1);
                    }

                    // Save updated inventory
                    await inventoryDB.set(`inventory_${interaction.user.id}`, inventory);
                }
            }
        },
        {
            name: "Lottery Ticket",
            description: "LETS GO GAMBLING",
            price: 150,
            emoji: "🎟️",
            avaliable: true,
            extradata: {},
            use: async function (client, interaction, inventory) {
                // Randomly determine if the user wins or loses
                const win = Math.random() < 0.6; // 60% chance to win
                // If the user wins, give them a random amount of money between 20 and 500 in intervals of 20
                if (win) {
                    const moneyWon = Math.floor(Math.random() * 25 + 1) * 20; // Random amount between 20 and 500
                    const currentMoney = await moneyDB.get(`money_${interaction.user.id}`) || 0;
                    await moneyDB.set(`money_${interaction.user.id}`, currentMoney + moneyWon);
                    interaction.reply({
                        content: `You won **$${moneyWon.toFixed(2)}**! Congratulations!`,
                        ephemeral: false
                    });
                } else {
                    interaction.reply({
                        content: "You lost the lottery ticket. Better luck next time!",
                        ephemeral: false
                    });
                }
                const index = inventory.findIndex(i => i.name.toLowerCase() === "Lottery Ticket".toLowerCase());
                if (index !== -1) {
                    inventory[index].amount -= 1;

                    // Remove item entirely if amount is 0
                    if (inventory[index].amount <= 0) {
                        inventory.splice(index, 1);
                    }

                    // Save updated inventory
                    await inventoryDB.set(`inventory_${interaction.user.id}`, inventory);
                }
            }
        },

    ]
};
