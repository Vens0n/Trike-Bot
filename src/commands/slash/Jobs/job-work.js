const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");

const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });
const jobsDB = new QuickDB({ filePath: "DB/workforce.sqlite" });
const tasksDB = new QuickDB({ filePath: "DB/tasks.sqlite" });

module.exports = {
    name: "job-work",
    description: "Work your job",
    type: 1,
    coolDownTime: 2 * 60 * 60,
    //!           H x MM x SS

    execute: async (client, interaction) => {

        const userId = interaction.user.id;

        let job = await jobsDB.get(`active_${userId}`);

        if (!job) {
            return interaction.reply({
                content: "❌ You don't have a job. Use `/job apply`.",
                ephemeral: true
            });
        }

        

        /* ---------------- RISK SYSTEM ---------------- */

        // Find risk values from jobs.js
        const jobsList = client.jobs;
        job.risk = jobsList[job.tier].find(j => j.id === job.id).risk;
        job.damage = jobsList[job.tier].find(j => j.id === job.id).damage;

        let damageApplied = false;
        let damageText = "";
        let percentLoss = 0;
        let extraCooldown = 0;

        if (Math.random() < job.risk) {
            damageApplied = true;
            damageText = job.damage.message;

            if (job.damage.type === 1) {
                percentLoss = job.damage.factor;
            }

            if (job.damage.type === 2) {
                extraCooldown = job.damage.factor;
            }
        }

        /* ---------------- REMINDER SYSTEM ---------------- */

        let baseCooldown = Date.now() + module.exports.coolDownTime * 1000;

        if (extraCooldown > 0) {
            baseCooldown += extraCooldown * 60 * 60 * 1000;
        }
        
        const runAt = baseCooldown + (12 * 60 * 60 * 1000); // 12 hours after cooldown ends

        await client.config.removeUserTaskIfExists(
            module.exports.name,
            "reminder",
            userId
        );

        const taskId = `${Date.now()}_${userId}_${Math.floor(Math.random() * 1000)}`;

        const task = {
            id: taskId,
            createdAt: Date.now(),
            source: module.exports.name,
            type: "reminder",
            runAt,
            data: {
                userId,
                title: "Boss is getting angry!",
                description:
                    "You don't want to piss of your boss, do you?\n" +
                    "Use <cmd> to work again and earn money.",
            },
        };

        client.emit("newTask", task);

        const tasks = (await tasksDB.get("scheduledTasks")) || [];
        tasks.push(task);
        await tasksDB.set("scheduledTasks", tasks);

        /* ---------------- XP SYSTEM ---------------- */

        const xpGain = client.random(15, 25, 2);
        job.xp += xpGain;

        const level = client.getLevel(job.xp);

        /* ---------------- PAY CALCULATION ---------------- */

        const bonus = level * (Math.random() * 10 + 5);

        let total = job.salary + bonus;

        let lossAmount = 0;

        if (damageApplied && percentLoss > 0) {
            lossAmount = total * percentLoss;
            total -= lossAmount;
        }

        total = Math.max(0, total);
        total = Number(total.toFixed(2));
        lossAmount = Number(lossAmount.toFixed(2));

        /* ---------------- COOLDOWN ---------------- */

        await client.cooldownDB.set(
            `cooldown_${module.exports.name}_${userId}`,
            baseCooldown
        );

        /* ---------------- MONEY UPDATE ---------------- */

        const walletKey = `wallet_${userId}`;
        const wallet = (await moneyDB.get(walletKey)) || 0;

        await moneyDB.set(walletKey, wallet + total);

        /* ---------------- JOB STATS ---------------- */

        job.timesWorked++;
        job.moneyEarned += total;

        await jobsDB.set(`active_${userId}`, job);

        /* ---------------- EMBED OUTPUT ---------------- */

        let riskSection = "";

        if (damageApplied) {
            if (percentLoss > 0) {
                riskSection =
                    `⚠️ **Risk Event!**\n` +
                    `${damageText}\n` +
                    `You lost **$${lossAmount}** (${percentLoss * 100}%)\n\n`;
            }

            if (extraCooldown > 0) {
                riskSection =
                    `⚠️ **Risk Event!**\n` +
                    `${damageText}\n` +
                    `Extra cooldown added: **${extraCooldown} hours**\n\n`;
            }
        }

        const embed = new EmbedBuilder()
            .setColor(damageApplied ? 0xff5c5c : client.config.embedColor())
            .setTitle(`${job.emoji} Work Shift Complete`)
            .setDescription(
                riskSection +
                `You worked as a **${job.name}**\n\n` +
                `💵 Base Pay: $${job.salary.toFixed(2)}\n` +
                `✨ Bonus: $${bonus.toFixed(2)}\n` +
                `💰 Total Earned: **$${total.toFixed(2)}**\n\n` +
                `📈 XP Gained: +${xpGain}\n` +
                `⭐ Total XP: ${job.xp.toFixed(0)}\n` +
                `🏅 Level: ${level}`
            )
            .setFooter({
                text: client.config.embedfooterText,
                iconURL: client.user.displayAvatarURL()
            });

        await interaction.reply({ embeds: [embed] });

        /* ---------------- TIER UNLOCK ---------------- */

        if (level >= 10) {

            const activejob = await jobsDB.get(`active_${userId}`);

            if (activejob.levelten !== true) {

                const tier = (await jobsDB.get(`tier_${userId}`)) ?? 0;

                await jobsDB.set(`tier_${userId}`, tier + 1);
                await jobsDB.set(`active_${userId}`, { ...activejob, levelten: true });

                await interaction.followUp({
                    content: `🎉 You reached Level ${level} and unlocked **Tier ${tier + 1} jobs!**`,
                    ephemeral: true
                });
            }
        }

    }
};
