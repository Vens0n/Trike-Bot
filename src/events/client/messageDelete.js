const { QuickDB } = require("quick.db");

module.exports = {
    name: 'messageDelete',
    once: false,

    /**
     * @param {Client} client 
     */
    async execute(message, client) {
        const db = new QuickDB()
        await db.set(`snipestorage_${message.channel.id}`, message)
    }
}
