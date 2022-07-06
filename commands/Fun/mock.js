/*..eval
async function f() {

let jfds = await message.fetchReference()
console.log(jfds)
}
 f();*/

 module.exports = {
     name: "mock",
     category: "Fun",
     description: "Mock someone publicly",
     ownerOnly: false,
     run: async (client, message, args) => {
         message.reply("This command isn't working atm, sry :(")
         /*var reply = await message.fetchReference()
         console.log(reply)
         if(!reply.message.content) {
           message.channel.send(reply.content)
         } else {
           if(!args[0]) message.reply("Either give me text to mock or reply to something for me to mock.")
         }*/
     },
 };
