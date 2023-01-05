const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    name: 'guildMemberRemove',

    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { guild } = member;
        console.log(`${member.user.username} join guilds ${guild.name}`);
        var joinchannel = await db.get(`welcomechannel_${member.guild.id}`)
        var leavemessage = await db.get(`leavemessage_${member.guild.id}`)
        console.log(joinchannel)
        console.log(leavemessage)
        if(joinchannel && leavemessage) {
            try {
                
                var leavemessagepreview = leavemessage
                leavemessagepreview = leavemessagepreview.replace("{username}", member.user.username)
                leavemessagepreview = leavemessagepreview.replace("{userping}", `<@${member.user.id}>`)
                await client.channels.cache.get(joinchannel).send(leavemessagepreview)
            } catch(e) {
                console.log(`Couldn't welcome ${member.user.username} due to ${e}`)
            }
        }
    }
}
