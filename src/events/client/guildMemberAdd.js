const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    name: 'guildMemberAdd',

    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { guild } = member;
        console.log(`${member.user.username} join guilds ${guild.name}`);
        var joinrole = await db.get(`welcomerole_${member.guild.id}`)
        var joinchannel = await db.get(`welcomechannel_${member.guild.id}`)
        var joinmessage = await db.get(`joinmessage_${member.guild.id}`)
        if(joinrole) {
            try {
                await member.roles.add(joinrole)
                console.log(`Gave ${member.user.username} a role properly`)
            } catch(e) {
                console.log(`Couldn't give ${member.user.username} a role properly due to ${e}`)
            }
        }
        console.log(joinchannel)
        console.log(joinmessage)
        if(joinchannel && joinmessage) {
            try {
                
                var joinmessagepreview = joinmessage
                joinmessagepreview = joinmessagepreview.replace("{username}", member.user.username)
                joinmessagepreview = joinmessagepreview.replace("{userping}", `<@${member.user.id}>`)
                await client.channels.cache.get(joinchannel).send(joinmessagepreview)
            } catch(e) {
                console.log(`Couldn't welcome ${member.user.username} due to ${e}`)
            }
        }
    }
}
