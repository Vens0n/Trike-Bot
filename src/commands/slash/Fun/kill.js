module.exports = {
    name: "kill",
    aliases: ["k", "unalive"],
    usage: '..kill @username',
    category: "Fun",
    description: "We can't exspect god to do all the work...",
    ownerOnly: false,
    run: async (client, message, args) => {
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!mentioned) return message.reply("Who you gonna kill!?")
        if(mentioned.id == message.author.id) return message.reply("Suicide is no joke.")
        var choices = ["username fell over.", "username was slain by author", "username was backstabbed by author.", "author cooked username alive", "author killed username, i saw him vent too!", "username vanished.", "username got jumped.", "username forgot how to breathe.", "username ate wayyy to much taco bell", "username didn't wake up."]
        const choice = choices[Math.floor(Math.random() * choices.length)].replace("username", mentioned.user.username).replace("author", message.author.username)
        message.channel.send(choice)
    },
};
