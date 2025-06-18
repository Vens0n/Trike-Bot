const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const tasksDB = new QuickDB({ filePath: "DB/tasks.sqlite" });
/**
 * Load Ev, QuickDBents
 */
const loadEvents = async function (client) {
	const eventFolders = fs.readdirSync(`${client.cwd}/src/events`);
	for (const folder of eventFolders) {
		const eventFiles = fs.readdirSync(`${client.cwd}/src/events/${folder}`).filter((file) => file.endsWith(".js"));

		for (const file of eventFiles) {
			const event = require(`${client.cwd}/src/events/${folder}/${file}`);

			if (event.name) {
				console.log(` ✔️ => Event ${file} is being loaded `);
			} else {
				console.log(` ❌ => Event ${file} missing a help.name or help.name is not in string `);
				continue;
			}

			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			} else {
				client.on(event.name, (...args) => event.execute(...args, client));
			}
		}
	}
};

const removeUserTaskIfExists = async function (taskSRC, type = "dm", userId) {
	const allTasks = (await tasksDB.get("scheduledTasks")) || [];
	console.log(`🔍 Checking for existing task of type ${type} with source ${taskSRC}...`);
	const existingTask = allTasks.find((t) => t.type === type && t.source === taskSRC && t.data.userId === userId);
	console.log(existingTask)
	if (!existingTask) return false;

	await tasksDB.set(
		"scheduledTasks",
		allTasks.filter((t) => t.id !== existingTask.id)
	);

	return true;
};

const loadTaskLoader = async function (client) {
	const taskMap = {
		dm: async (task) => {
			const user = await client.users.fetch(task.data.userId).catch(() => null);
			const embed = new EmbedBuilder()
				.setTitle(task.data.title || "Scheduled Task")
				.setDescription(`${task.data.description}\n\n-# Scheduled at \<t:${Math.floor(task.createdAt / 1000)}:F> to run at \<t:${Math.floor(task.runAt / 1000)}:F>`)
				.setColor(client.config.embedColor())
				.setFooter({ text: `Scheduled Trike DM.`, iconURL: client.user.displayAvatarURL() });

			if (user) user.send({ embeds: [embed] }).catch(() => null);
		},
		reminder: async (task) => {
			const commands = await client.application.commands.fetch();
			const helpCommand = commands.find((cmd) => cmd.name === task.source);
			console.log(helpCommand.id);

			task.data.description = task.data.description.replace("<cmd>", `</${helpCommand.name}:${helpCommand.id}>`);
			const user = await client.users.fetch(task.data.userId).catch(() => null);
			const embed = new EmbedBuilder()
				.setTitle(task.data.title || "Reminder")
				.setDescription(`${task.data.description}\n\n-# Scheduled at \<t:${Math.floor(task.createdAt / 1000)}:F> to run at \<t:${Math.floor(task.runAt / 1000)}:F>`)
				.setColor(client.config.embedColor())
				.setFooter({ text: `Scheduled Trike Reminder.`, iconURL: client.user.displayAvatarURL() });

			if (user) user.send({ embeds: [embed] }).catch(() => null);
		},
	};

	async function loadTasks(client) {
		const tasks = (await tasksDB.get("scheduledTasks")) || [];
		const now = Date.now();

		console.log(`🔧 Loading ${tasks.length} scheduled tasks...`);

		for (const task of tasks) {
			const delay = task.runAt - now;

			if (delay <= 0) {
				console.log(`⏰ Running overdue task: ${task.id}`);
				await runTask(task, client);
			} else {
				console.log(`⏳ Scheduling task ${task.id} in ${delay}ms`);
				setTimeout(async () => {
					try {
						await runTask(task, client);
						console.log(`✅ Ran scheduled task ${task.id}`);
					} catch (err) {
						console.error(`❌ Error running task ${task.id}:`, err);
					}
				}, delay);
			}
		}
	}

	async function runTask(task, client) {
		// Confirm the task still exists in the DB
		const tasks = (await tasksDB.get("scheduledTasks")) || [];
		const stillExists = tasks.find((t) => t.id === task.id);
		if (!stillExists) {
			console.log(`⛔ Skipping cancelled task ID ${task.id}`);
			return;
		}

		// Proceed to run it
		const func = taskMap[task.type];
		if (func) await func(task, client);

		// Remove it from DB after running
		await tasksDB.set(
			"scheduledTasks",
			tasks.filter((t) => t.id !== task.id)
		);
		console.log(`✅ Completed and removed task ID ${task.id}`);
	}

	client.on("newTask", (task) => {
		const delay = task.runAt - Date.now();
		setTimeout(async () => {
			await runTask(task, client);
		}, delay);
	});
	await loadTasks(client);
};
const loadSlashCommands = async function (client) {
	let slash = [];

	const commandFolders = fs.readdirSync(`${client.cwd}/src/commands/slash`);
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`${client.cwd}/src/commands/slash/${folder}`).filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`${client.cwd}/src/commands/slash/${folder}/${file}`);
			if (command.name) {
				// Prepare the command structure to include UserInstall integration type
				const commandData = {
					...command,
					contexts: [2, 1, 0],
				};
				client.slash.set(command.name, commandData);
				slash.push(commandData);
				console.log(` ✔️ => SlashCommand ${file} is being loaded `);
			} else {
				console.log(` ❌ => SlashCommand ${file} missing a name or name is not a string `);
				continue;
			}
		}
	}

	client.on("ready", async () => {
		console.log("Registering global slash commands…");
		await client.application.commands.set(slash);
		console.log(
			"Registered slash commands:",
			slash.map((cmd) => cmd.name)
		);
	});
};

module.exports = {
	loadEvents,
	loadSlashCommands,
	loadTaskLoader,
	removeUserTaskIfExists,
};
