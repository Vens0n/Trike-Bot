const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });
const tasksDB = new QuickDB({ filePath: "DB/tasks.sqlite" });
const jobsDB = new QuickDB({ filePath: "DB/workforce.sqlite" });

module.exports = {
	name: "work",
	description: "You don't have a j*b, but you can surly find something do to.",
	type: 1,
	coolDownTime: 2 * 60 * 60, // 16 hours in seconds
	execute: async (client, interaction, args) => {
		const runAt = Date.now() + 16 * 60 * 60 * 1000;
		const taskRemoved = await client.config.removeUserTaskIfExists("work", "reminder", interaction.user.id);
		if (taskRemoved) {
			console.log("Previous task found and removed.");
		} else {
			console.log("No previous task found for user.");
		}
		const task = {
			id: Date.now() + `${interaction.user.id}` + Math.floor(Math.random() * 1000),
			createdAt: Date.now(),
			source: "work",
			type: "reminder",
			runAt,
			data: {
				userId: interaction.user.id,
				title: "Looking for cash?",
				description: "The economy is yearning for you to step back into action!\nYou can use <cmd> at any point anywhere to w*rk and earn some cash.",
			},
		};
		client.emit("newTask", task);
		await tasksDB.push("scheduledTasks", task);

		const userId = interaction.user.id;
		const walletKey = `wallet_${userId}`;
		const wallet = (await moneyDB.get(walletKey)) || 0;

		if (Math.random() < 0.01) {
			const gifURL = "https://tenor.com/view/akira-job-application-get-a-job-akira-job-application-gif-8274337411388777231"; // Replace with your gif
			return interaction.reply({ content: gifURL, ephemeral: true });
		}
		const job = (await jobsDB.get(`job_${userId}`)) || [];

		if (job.length === 0) {
			const alljobs = client.config.jobs.filter((j) => j.enabled);
			const randomJobs = alljobs.sort(() => 0.5 - Math.random()).slice(0, 4);

			const embed = new client.discord.EmbedBuilder()
				.setColor(client.config.embedColor())
				.setTitle("No Job Found")
				.setDescription("You don't have a job. Choose one below.")
				.addFields({ name: randomJobs[0].name, value: `${randomJobs[0].emoji} ${randomJobs[0].description}\n$${randomJobs[0].salary} a shift.`, inline: true }, { name: randomJobs[1].name, value: `${randomJobs[1].emoji} ${randomJobs[1].description}\n$${randomJobs[1].salary} a shift.`, inline: true }, { name: "\u200B", value: "\u200B", inline: true }, { name: randomJobs[2].name, value: `${randomJobs[2].emoji} ${randomJobs[2].description}\n$${randomJobs[2].salary} a shift.`, inline: true }, { name: randomJobs[3].name, value: `${randomJobs[3].emoji} ${randomJobs[3].description}\n$${randomJobs[3].salary} a shift.`, inline: true }, { name: "\u200B", value: "\u200B", inline: true })
				.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL() });

			// Buttons
			const buttons = new client.discord.ActionRowBuilder().addComponents(new client.discord.ButtonBuilder().setCustomId("job_pick_0").setLabel(randomJobs[0].name).setEmoji(randomJobs[0].emoji).setStyle(client.discord.ButtonStyle.Primary), new client.discord.ButtonBuilder().setCustomId("job_pick_1").setLabel(randomJobs[1].name).setEmoji(randomJobs[1].emoji).setStyle(client.discord.ButtonStyle.Primary), new client.discord.ButtonBuilder().setCustomId("job_pick_2").setLabel(randomJobs[2].name).setEmoji(randomJobs[2].emoji).setStyle(client.discord.ButtonStyle.Primary), new client.discord.ButtonBuilder().setCustomId("job_pick_3").setLabel(randomJobs[3].name).setEmoji(randomJobs[3].emoji).setStyle(client.discord.ButtonStyle.Primary));

			// Send initial reply with embed and buttons
			const msg = await interaction.reply({
				embeds: [embed],
				components: [buttons],
				fetchReply: true,
				ephemeral: true,
				withResponse: true,
			});

			const collectorFilter = (i) => i.user.id === interaction.user.id;

			try {
				const collector = await msg.awaitMessageComponent({ filter: collectorFilter, time: 15000 });

				const index = parseInt(collector.customId.replace("job_pick_", ""));
				const selected = {
					name: randomJobs[index].name,
					emoji: randomJobs[index].emoji,
					id: randomJobs[index].id,
					salary: randomJobs[index].salary,
					exsperience: 0,
				}

				await jobsDB.set(`job_${interaction.user.id}`, selected);

				const confirmEmbed = new client.discord.EmbedBuilder()
					.setColor("#00FF00")
					.setTitle("Job Chosen!")
					.setDescription(`You picked ${selected.emoji} **${selected.name}**.\nYou will earn **$${selected.salary}** per shift.`)
					.setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL() });

				const newButtons = new client.discord.ActionRowBuilder().addComponents(
					randomJobs.map((j, i) =>
						new client.discord.ButtonBuilder()
							.setCustomId(`job_pick_${i}`)
							.setLabel(j.name)
							.setEmoji(j.emoji)
							.setStyle(i === index ? client.discord.ButtonStyle.Success : client.discord.ButtonStyle.Secondary)
							.setDisabled(true)
					)
				);

				await collector.update({ embeds: [confirmEmbed], components: [newButtons] });
			} catch (err) {
				await interaction.editReply({
					content: "No job picked in time. Try the command again.",
					embeds: [],
					components: [],
				});
			}
			return;
		} else {
			const jobName = job.name;
			console.log(`cooldown_${module.exports.name}_${interaction.user.id}`)
			await client.cooldownDB.set(`cooldown_${module.exports.name}_${interaction.user.id}`, Date.now() + module.exports.coolDownTime * 1000);

			// Ensure job experience is initialized
			job.exsperience = job.exsperience || 0;

			// Add random experience
			const xpGain = Math.floor(Math.random() * 15) + 5;
			job.exsperience += xpGain;

			// Get new job level
			const jobLevel = client.getLevel(job.exsperience) || 0;

			// Calculate salary and bonus
			const baseSalary = job.salary;
			// Random amount around 5
			const levelBonus = jobLevel * Math.random() * (5.5 - 4.5) + 4.5;
			const totalEarned = baseSalary + levelBonus;

			// Update wallet and bank
			const walletKey = `wallet_${interaction.user.id}`;
			const bankKey = `bank_${interaction.user.id}`;

			const currentWallet = (await moneyDB.get(walletKey)) || 0;
			const currentBank = (await moneyDB.get(bankKey)) || 0;

			await moneyDB.set(walletKey, currentWallet + baseSalary);
			await moneyDB.set(bankKey, currentBank + levelBonus);

			// Update job with new experience
			await jobsDB.set(`job_${interaction.user.id}`, job);

			// Respond with embed
			const embed = new EmbedBuilder()
				.setColor(client.config.embedColor())
				.setTitle("Work " + job.emoji)
				.setDescription(
					`You worked as a ${jobName} and earned **$${(totalEarned).toFixed(2)}**.\n\n` +
					`**Breakdown:**\n` +
					`• Base Salary (→ Wallet 👜): $${baseSalary.toFixed(2)}\n` +
					`• Level Bonus (→ Bank 🏦): $${levelBonus.toFixed(2)}\n\n` +
					`Your current job level is **${jobLevel}**, and you now have **${job.exsperience} XP** in this job.`
				)
				.setFooter({ text: `${interaction.user.displayName} worked hard today and now has $${(currentWallet + baseSalary).toFixed(2)}.`, iconURL: interaction.user.displayAvatarURL() })

			await interaction.reply({ embeds: [embed], ephemeral: false });

		}
	},
};
