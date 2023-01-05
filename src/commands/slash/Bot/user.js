const {
    MessageEmbed,
} = require('discord.js');
const moment = require('moment');
module.exports = {
    name: "user",
    aliases: ["userinfo", "about", "whois", "who"],
    usage: '..user [@user || user_id]',
    category: "Bot",
    options: [
        {
            name: 'user',
            description: 'The user you are investigating',
            type: 'USER',
            required: true
        }
    ],
    description: "Who is this guy?",
    ownerOnly: false,
    version: "1",
    run: async (client, interaction) => {

      const member = interaction.options.getMember("user")
      const statuses = {
          online: "Online",
          dnd: "Dnd",
          idle: "Idle",
          offline: "Offline",
      };

      let status;
      /*if (!member.presence) {
          status = 'Unknown;'
      } else {
          status = statuses[member.presence.status]
      }*/
      var allroles = []
      await interaction.guild.members.cache.get(member.user.id).roles.cache.forEach( therole => {
        try {
          if(therole.id == interaction.guild.id) return
          allroles[therole.rawPosition] = therole.id
        } catch (err) {
          console.log(err)
        }
      })
      allroles = allroles.reverse()
      var showingroles = []
      var tew = 0
      allroles.forEach(i => {
        if(tew > 4) return
        showingroles.push(`<@&${i}>`)
        tew++
      })
      console.log(showingroles)
      if(!showingroles[0]) showingroles.push("No roles.")
      const exampleEmbed = new MessageEmbed()
          .setTitle(`${member.user.username}'s Profile`)
          .setColor(client.config.embedColor)
          .setThumbnail(member.user.avatarURL({
              size: 1024,
              dynamic: true,
          }))
          .addFields({
              name: "User",
              value: `${member.user.tag} (${member.id})`,
              inline: true,
          }, {
              name: "Status",
              value: `${member.user.presence}`,
              inline: true,
          }, {
              name: `Roles`,
              value: showingroles.join(", "),
              inline: true,
          }, {
              name: `Avatar Url`,
              value: `[Link](${member.user.avatarURL()})`,
              inline: true,
          }, {
              name: `Joined Date`,
              value: " " + member.joinedAt,
              inline: true,
          }, {
              name: `Creation Date`,
              value: " " + member.user.createdAt,
              inline: true,
          })
          .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` })
          .setTimestamp();

      interaction.reply({
          embeds: [exampleEmbed],
      });

    },
};
