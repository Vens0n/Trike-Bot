module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "Mod",
    usage: '..clear 50',
    description: "Clean up the chat",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to use this command.");
      if(!args[0]) return message.channel.send("Please provide a number between 2 and 100.")
      if (args[0] < 2 || args[0] > 100) return message.channel.send("Please provide a number between 2 and 100.")
      amount = args[0]
      const { size } = await message.channel.bulkDelete(amount, true)
      message.channel.send("Deleted " + size + " messages!")
        .then(msg => {
          setTimeout(() => msg.delete(), 3000)
        })
        .catch();

    },
};
