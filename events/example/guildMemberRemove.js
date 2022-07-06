const { QuickDB } = require("quick.db");


module.exports = {
    name: 'guildMemberRemove',

    /**
     * @param {GuildMember} member
     * @param {Client} client
     */
    async execute(member, client) {
        const db = new QuickDB()
        const { guild } = member;
        //console.log(member)
        console.log(`${member.user.username} left guilds ${guild.name}`);
        const channel = await db.get(`welcomechannel_${guild.id}`)
        var leavemessage = await db.get(`leavemessage_${guild.id}`)
        if(!leavemessage) leavemessage = "USER_NAME just left the server :("
        if(channel) {
          try {
            client.channels.cache.get(channel).send(leavemessage.replace("USER_PING", "<@" + member.user.id + ">").replace("USER_NAME", member.user.username))
          } catch(err) {
            console.log(err)
          }
        }
    }
}
