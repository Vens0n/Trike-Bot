const { QuickDB } = require("quick.db");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const tasksDB = new QuickDB({ filePath: "DB/tasks.sqlite" });

module.exports = {
	name: "test",
	description: "debugging cmd to dm you at a later scheduled time",
	type: 1,
	options: [
			{
				name: "fakelevel",
				description: "Wallah",
				type: ApplicationCommandOptionType.Number,
				required: true,
			}],
	execute: async (client, interaction, args) => {


		interaction.reply(getLevel(args[0] * 3) + "    Tada!!   " + getLevel(args[0]))
	},
};
