const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });
const jobsDB = new QuickDB({ filePath: "DB/workforce.sqlite" });

const COOLDOWN = 2 * 60 * 60 * 1000; // 2 hours (change later)

module.exports = {
    name: "job-work",
    description: "Work your job",
    type: 1,

    execute: async (client, interaction) => {

        const userId = interaction.user.id;

        const job = await jobsDB.get(`active_${userId}`);

        if (!job) {
            return interaction.reply({
                content: "❌ You don't have a job. Use `/job apply`.",
                ephemeral: true
            });
        }

        const lastWorked = await jobsDB.get(`cooldown_${userId}`) || 0;

        if (Date.now() < lastWorked) {
            const remaining = Math.ceil((lastWorked - Date.now()) / 60000);
            return interaction.reply({
                content: `⏳ You can work again in **${remaining} minutes**.`,
                ephemeral: true
            });
        }

        // XP gain
        const xpGain = Math.floor(Math.random() * 15) + 10;
        job.xp += xpGain;

        // Level formula (simple)
        const level = Math.floor(job.xp / 100);

        // Bonus scales with level
        const bonus = level * (Math.random() * 10 + 5);

        const total = job.salary + bonus;

        // Update money
        const walletKey = `wallet_${userId}`;
        const wallet = (await moneyDB.get(walletKey)) || 0;
        await moneyDB.set(walletKey, wallet + total);

        // Update job stats
        job.timesWorked++;
        job.moneyEarned += total;

        await jobsDB.set(`active_${userId}`, job);
        await jobsDB.set(`cooldown_${userId}`, Date.now() + COOLDOWN);

        // OPTIONAL: tier unlock hook
        /*
        if (level >= 5) {
            const tier = (await jobsDB.get(`tier_${userId}`)) ?? 0;
            await jobsDB.set(`tier_${userId}`, tier + 1);
        }
        */

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor())
            .setTitle(`${job.emoji} Work Shift Complete`)
            .setDescription(
                `You worked as a **${job.name}**\n\n` +
                `💵 Base Pay: $${job.salary.toFixed(2)}\n` +
                `⭐ Bonus: $${bonus.toFixed(2)}\n` +
                `➡️ Total: **$${total.toFixed(2)}**\n\n` +
                `📈 XP Gained: ${xpGain}\n` +
                `🏆 Level: ${level}`
            )
            .setFooter({
                text: `Total earned at this job: $${job.moneyEarned.toFixed(2)}`
            });

        await interaction.reply({ embeds: [embed] });
    }
};
