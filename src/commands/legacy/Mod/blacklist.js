const { QuickDB } = require("quick.db");

module.exports = {
    name: "blacklist",
    aliases: ["bl"],
    category: "Mod",
    usage: '..blacklist add pp',
    description: "Watch your mouth",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You are not allowed to use this command.");
      if(!args[0]) return message.reply({embeds: [{
               title:  "Blacklist" ,
               color:  "ff0000" ,
               description:  "`..blacklist add pp` > Users can't use the word \"pp\"\n`..blacklist remove pp` > Users can use the word \"pp\" now\n`..blacklist clear` > Users can say whatever now\n`..blacklist list` > Sends a DM of all blacklisted words",
             }]})
      const db = new QuickDB()
      if(args[0].toLowerCase() == "add") {
        if(!args[1]) return message.channel.send("*insert needs args here*")
        if(args[2]) return message.channel.send("*insert only one word*")
        db.push(`chatfilter_${message.guild.id}`, args[1].toLowerCase())
        message.channel.send(`${message.author.username} added a no no word`)
        try {
          message.delete()
        } catch(e) {
          console.log(e)
        }
      } else
      if(args[0].toLowerCase() == "remove") {
        if(!args[1]) return message.channel.send("*insert needs args here*")
        if(args[2]) return message.channel.send("*insert only one word*")
        var word = args[1].toLowerCase()
        var arr = await db.get(`chatfilter_${message.guild.id}`);
        var happened = false;
        for( var i = 0; i < arr.length; i++){
          if ( arr[i] === word) {
            arr.splice(i, 1);
            happened = true;
          }
        }
        if(!happened) return message.reply("This word wasn't blacklisted to begin with")
        message.channel.send(message.author.username + " unblacklisted a word!")
        db.set(`chatfilter_${message.guild.id}`, arr)

      } else
      if(args[0].toLowerCase() == "clear") {
        try {
          db.set(`chatfilter_${message.guild.id}`, [])
        } catch(e) {
          message.reply("woops, " + e)
        }
        message.channel.send("Removed all Blacklisted words")

      } else
      if(args[0].toLowerCase() == "list") {
        const words = await db.get(`chatfilter_${message.guild.id}`)
        if(words.length == 0) return message.reply("The list is empty")
        message.reply("Sent list to DM's")
        try {
          message.member.send("```\n" + words.join("\n") + "\n```")
        } catch(e) {
          message.reply("I could not DM you, i won't say these words publicly :sob:")
        }
      } else {
        message.channel.send("*add blacklist work menu but bc wrong responce*")
      }
    },
};
