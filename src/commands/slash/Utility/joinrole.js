const { QuickDB } = require("quick.db");

module.exports = {
    name: "joinrole",
    aliases: ["autorole"],
    category: "Utility",
    description: "Suit up those new users!",
    ownerOnly: false,
    options: [{
      name: 'role',
      description: 'What role should users get as they join',
      type: 'ROLE',
      required: false
    }, {
  		name: 'remove',
  		description: 'Get rid of the join role?',
  		type: 'BOOLEAN',
  		required: false
  	}],
    version: "1",
    run: async (client, interaction) => {

      const role = interaction.options.getRole("role");
		  const remove = interaction.options.getBoolean("remove");

      if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        interaction.reply({
          content: client.config.permisionerror,
          ephemeral: true,
        });
        return;
      }
      const db = new QuickDB()
      if(!role && !remove) return interaction.reply({content: "You dingus, you need to tell me what role to give, or to remove it all together", ephemeral: true})
      if(remove) {
        await db.set(`welcomerole_${interaction.guild.id}`, 0)
        interaction.reply("New users will no longer get a role when they join!")
      } else {
        await db.set(`welcomerole_${interaction.guild.id}`, role.id)
        interaction.reply("New users will get the " + role.name + " role.")
      }
      console.log(`welcomerole_${interaction.guild.id}) will now equal ${role.name}`)
    },
};
