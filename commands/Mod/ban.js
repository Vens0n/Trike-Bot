module.exports = {
    name: "ban",
    category: "Mod",
    usage: '..ban @username',
    description: "Let the hammer speak",
    ownerOnly: false,
    run: async (client, message, args) => {
      if (message.member.permissions.has("BAN_MEMBERS")) {
          if (message.mentions.members.first()) {
            async function dothis() {
               try {
                  await message.mentions.members.first().ban();
                  message.reply("Hes been booted out.")
              } catch (error) {
                console.error(error)
                message.reply("I do not have permissions to ban said user.");
              }
            }
            dothis()
          } else {
              message.reply("<:troll:986413363032625192>");
          }
      } else {
          message.reply("You do not have permissions to ban anyone.");
      }
    },
};
