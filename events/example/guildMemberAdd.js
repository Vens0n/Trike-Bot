const { QuickDB } = require("quick.db");


module.exports = {
    name: 'guildMemberAdd',

    /**
     * @param {GuildMember} member
     * @param {Client} client
     */
    async execute(member, client) {
        const db = new QuickDB()
        const { guild } = member;
        //console.log(member)
        console.log(`${member.user.username} join guilds ${guild.name}`);
        const channel = await db.get(`welcomechannel_${guild.id}`)
        var joinmessage = await db.get(`welcomemessage_${guild.id}`)
        var joinrole = await db.get(`welcomerole_${guild.id}`)
        if(!joinmessage) joinmessage = "Welcome to the server USER_PING"
        if(channel) {
          try {
            client.channels.cache.get(channel).send(joinmessage.replace("USER_PING", "<@" + member.user.id + ">").replace("USER_NAME", member.user.username))
          } catch(err) {
            console.log(err)
          }
        }
        if(joinrole) {
          try {
            await guild.roles.fetch() //optional - put it if the role is valid, but is not cached
            let role = guild.roles.cache.find(role => role.id === joinrole)
            member.roles.add(role)
          } catch (error) {
            console.error(error)
          }
        }
    }
}
