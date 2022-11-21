 module.exports = {
     name: "kick",
     category: "Mod",
     usage: '..kick @username',
     description: "Kick em' out!",
     ownerOnly: false,
     run: async (client, message, args) => {
       if (message.member.permissions.has("KICK_MEMBERS")) {
           if (message.mentions.members.first()) {
               async function dothis() {
                  try {
                     await message.mentions.members.first().kick();
                     message.reply("Hes been knocked out.")
                 } catch (error) {
                   console.error(error)
                   message.reply("I do not have permissions to kick said user.");
                 }
               }
               dothis()
           } else {
               message.reply("You need to mention someone to kick!?");
           }
       } else {
           message.reply("You do not have permissions to kick anyone.");
       }
     },
 };
