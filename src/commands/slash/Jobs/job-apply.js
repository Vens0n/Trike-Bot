const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const jobsDB = new QuickDB({ filePath: "DB/workforce.sqlite" });
var templocker = []
console.log("Job Apply - Temp Locker initialized.");
module.exports = {
    name: "job-apply",
    description: "Apply for a job",
    type: 1,

    execute: async (client, interaction) => {

        const userId = interaction.user.id;

        const activeJob = await jobsDB.get(`active_${userId}`);
        const unlockedTier = (await jobsDB.get(`tier_${userId}`)) ?? 0;

        if (activeJob) {
            return interaction.reply({
                content: "❌ You already have a job. Quit it first.",
                ephemeral: true
            });
        }

        // Collect all jobs up to unlocked tier
        const availableJobs = [];

        for (let i = 0; i <= unlockedTier; i++) {
            const tierJobs = client.jobs[i] || [];
            tierJobs.forEach(j => {
                if (j.enabled) availableJobs.push({ ...j, tier: i });
            });
        }

        if (!availableJobs.length) {
            return interaction.reply({ content: "No jobs available.", ephemeral: true });
        }

        var message = null;
        var shownJob = null;
        // Grab a random job set to show
        if (!templocker[userId]) {
            shownJob = availableJobs[Math.floor(Math.random() * availableJobs.length)];
            templocker[userId] = shownJob;
            cooldown = setTimeout(() => { delete templocker[userId]; }, 15000);
        } else {
            message = "Showing previous job pull.\nIf you want a new job, please come back later.";
            shownJob = templocker[userId];
            console.log("Using locked job for user:", userId);
        }
        const embed = new EmbedBuilder()
            .setTitle("📄 Job Applications")
            .setDescription(`
                Do you want this job?

                ${shownJob.emoji} ${shownJob.name} (Tier ${shownJob.tier})
                ${shownJob.description}\n💰 $${shownJob.salary} per shift
                Risk: ${(shownJob.risk * 100).toFixed(2)}%`)
            .setColor(client.config.embedColor())
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL() });

        const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`apply`)
                    .setLabel("Apply")
                    .setEmoji("✅")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`decline`)
                    .setLabel("Decline")
                    .setStyle(ButtonStyle.Danger)
            )

        const msg = await interaction.reply({
            content: message,
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

            
            if (choice.customId === "decline") {
                await choice.update({
                    content: "❌ You declined the job application.",
                    embeds: [],
                    components: []
                });
            } else if (choice.customId === "apply") {
                const selected = shownJob;

                const jobData = {
                    id: selected.id,
                    name: selected.name,
                    emoji: selected.emoji,
                    salary: selected.salary,
                    tier: selected.tier,
                    xp: 0,
                    timesWorked: 0,
                    startedAt: Date.now(),
                    moneyEarned: 0
                };

                await jobsDB.set(`active_${userId}`, jobData);

                const confirm = new EmbedBuilder()
                    .setColor("#00ff00")
                    .setTitle("✅ Hired!")
                    .setDescription(`You are now a **${selected.name}**!`);

                await choice.update({
                    embeds: [confirm],
                    components: []
                });
            }

        } catch {
            await interaction.editReply({
                content: "⏱️ No job selected in time.",
                embeds: [],
                components: []
            });
        }
    }
};
