const { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder 
} = require("discord.js");

const { QuickDB } = require("quick.db");

const jobsDB = new QuickDB({ filePath: "DB/workforce.sqlite" });

module.exports = {
    name: "job-quit",
    description: "Quit your current job",
    type: 1,

    execute: async (client, interaction) => {

        const userId = interaction.user.id;

        const job = await jobsDB.get(`active_${userId}`);
        const tier = (await jobsDB.get(`tier_${userId}`)) ?? 0;

        if (!job) {
            return interaction.reply({
                content: "❌ You don't have a job to quit.",
                ephemeral: true
            });
        }

        // Confirmation embed
        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor())
            .setTitle("⚠️ Quit Job?")
            .setDescription(
                `Are you sure you want to quit your job as **${job.emoji} ${job.name}**?\n\n` +
                `❗ This will reset all progress for this job.\n` +
                `✅ Your unlocked tier will stay at **Tier ${tier}**.`
            )
            .setFooter({
                text: client.config.embedfooterText,
                iconURL: client.user.displayAvatarURL()
            });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("confirm_quit")
                .setLabel("Yes, Quit")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("cancel_quit")
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Secondary)
        );

        const msg = await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true,
            fetchReply: true
        });

        try {
            const choice = await msg.awaitMessageComponent({
                filter: i => i.user.id === userId,
                time: 15000
            });

            // Cancel
            if (choice.customId === "cancel_quit") {
                return choice.update({
                    content: "✅ Job quit cancelled.",
                    embeds: [],
                    components: []
                });
            }

            // Confirm quit
            if (choice.customId === "confirm_quit") {

                await jobsDB.delete(`active_${userId}`);
                await jobsDB.push(`history_${userId}`, job);


                await choice.update({
                    content: `👋 You are now unemployed.\nYou currently have **Tier ${tier} job experience** unlocked.`,
                    embeds: [],
                    components: []
                });
            }

        } catch {
            await interaction.editReply({
                content: "⏱️ Quit confirmation timed out.",
                embeds: [],
                components: []
            });
        }
    }
};
