const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const jobsDB = new QuickDB({ filePath: "DB/workforce.sqlite" });

module.exports = {
    name: "job-status",
    description: "View your job stats",
    type: 1,

    execute: async (client, interaction) => {

        const userId = interaction.user.id;

        const job = await jobsDB.get(`active_${userId}`);
        const tier = (await jobsDB.get(`tier_${userId}`)) ?? 0;

        if (!job) {
            return interaction.reply({
                content: "❌ You are currently unemployed. You have **tier " + tier + "** job experience. Use `/job apply` to get a job.",
                ephemeral: true
            });
        }

        const xp = job.xp;
        const level = Math.floor(xp / 100);

        cooldown = await client.cooldownDB.get(`cooldown_job-work_${interaction.user.id}`)

        let cdText = "Ready";

        if (cooldown && Date.now() < cooldown) {
            cdText = `<t:${(cooldown / 1000).toFixed(0)}:R>`;
        }

        const jobsList = client.jobs;
        job.risk = jobsList[job.tier].find(j => j.id === job.id).risk;

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor())
            .setTitle(`${job.emoji} ${job.name} — Status`)
            .addFields(
                { name: "Tier", value: `${tier}`, inline: true },
                { name: "Level", value: `${client.getLevel(xp)} (${xp.toFixed(0)} XP)`, inline: true },
                { name: "Risk", value: `${(job.risk * 100).toFixed(1)}%`, inline: true },
                
                { name: "Times Worked", value: `${job.timesWorked}`, inline: true },
                { name: "Money Earned", value: `$${job.moneyEarned.toFixed(2)}`, inline: true },
                { name: "Cooldown", value: cdText, inline: true }
            )
            .setFooter({ text: "Keep grinding 💪" });

        await interaction.reply({ embeds: [embed] });
    }
};
