const {
    MessageEmbed,
} = require('discord.js');

const moment = require('moment');
module.exports = {
    name: "user",
    aliases: ["userinfo", "about"],
    usage: '..user [@user || user_id]',
    category: "Bot",
    description: "Who is this guy?",
    ownerOnly: false,
    run: async (client, message, args) => {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      const statuses = {
          online: "Online",
          dnd: "Dnd",
          idle: "Idle",
          offline: "Offline",
      };

      let status;
      if (!member.presence) {
          status = 'Unknown;'
      } else {
          status = statuses[member.presence.status]
      }
      var allroles = []
      message.guild.members.cache.get(member.user.id).roles.cache.forEach( therole => {
        try {
          if(therole.id == message.guild.id) return
          allroles.push("<@&" + therole.id + ">")
        } catch (err) {
          console.log(err)
        }
      })
      if(!allroles[0]) allroles.push("No roles :flushed:")
      const exampleEmbed = new MessageEmbed()
          .setTitle(`${member.user.username}'s Profile`)
          .setColor('#ff0000')
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
              value: `${status}`,
              inline: true,
          }, {
              name: `Roles`,
              value: allroles.join(", "),
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
          .setFooter({
              text: `Requested by ${message.author.username}`,
          })
          .setTimestamp();

      message.channel.send({
          embeds: [exampleEmbed],
      });

    },
};
