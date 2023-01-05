module.exports = {
    name: "kill",
    aliases: ["k", "unalive"],
    usage: '..kill @username',
    category: "Fun",
    options: [
        {
            name: 'victim',
            description: 'Pick the desired target.',
            type: 'USER',
            required: true
        }
    ],
    description: "We can't exspect god to do all the work...",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {
        const mentioned = interaction.options.getMember("avatar")
        if(mentioned.id == interaction.user.id) return message.reply("Suicide is no joke.")
        var choices = ["username fell over.", "username was slain by author", "username was backstabbed by author.", "author cooked username alive", "author killed username, i saw him vent too!", "username vanished.", "username got jumped.", "username forgot how to breathe.", "username ate wayyy to much taco bell", "username didn't wake up."]
        const choice = choices[Math.floor(Math.random() * choices.length)].replace("username", mentioned.user.username).replace("author", interaction.user.username)
        interaction.reply(choice)
    },
};
