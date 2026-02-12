const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const Canvas = require('canvas')
const GIFEncoder = require('gifencoder')
const path = require('path')
const fs = require('fs')

module.exports = {
    name: "image-whatdoesheevendo",
    description: "Make a meme 'What does [user] even do?'.",
    type: 1,
    options: [
        {
            name: "user",
            description: "Use a user's avatar.",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
        {    
            name: "url",
            description: "Or provide an image URL.",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "attachment",
            description: "Or upload an image.",
            type: ApplicationCommandOptionType.Attachment,
            required: false,
        }
    ],

    execute: async (client, interaction, args) => {
        const user = interaction.options.getUser("user") || null;
        const url = interaction.options.getString("url") || null;
        const attachment = interaction.options.getAttachment("attachment") || null;

        let pfpurl = null;
        let username = null;
        let message = null;

        if (attachment) {
            pfpurl = attachment.url;
        } else if (url) {
            pfpurl = url;
        } else if (user) {
            message = `What does ${user} even **do**?`
            username = user.displayName || user.username;
            pfpurl = user.displayAvatarURL({ extension: 'png', size: 512 });

        } else {
            return interaction.reply({ content: "Please provide a user, URL, or attachment to use for the image.", ephemeral: true });
        }
        let whatdoesGif;
        try {
            whatdoesGif = await whatdooesheevendo(pfpurl, username)
        } catch (error) {
            console.error("Error generating image:", error);
            return interaction.reply({ content: "An error occurred while generating the image.", ephemeral: true });
        }
        await client.cooldownDB.set(`cooldown_${module.exports.name}_${interaction.user.id}`, Date.now() + module.exports.coolDownTime * 1000);

        interaction.reply({
            content: message,
            files: [{
                attachment: whatdoesGif,
                name: "whatdooesheevendo.gif"
            }]
        });
        
    },
};

async function whatdooesheevendo(pfpurl) {

    const bottomimage = await Canvas.loadImage(path.resolve(__dirname, "./data/whatdoes/bottom.png"))
    const topimage = await Canvas.loadImage(path.resolve(__dirname, "./data/whatdoes/top.png"))
    const leftimage = await Canvas.loadImage(pfpurl)

    // Main canvas
    const canvas = Canvas.createCanvas(
        bottomimage.width,
        bottomimage.height
    )
    const ctx = canvas.getContext('2d')

    // Draw bottom layer
    ctx.drawImage(bottomimage, 0, 0)

    // ----- Prepare left image -----

    const leftCanvas = Canvas.createCanvas(
        leftimage.width,
        leftimage.height
    )
    const leftCtx = leftCanvas.getContext('2d')

    leftCtx.drawImage(leftimage, 0, 0)


    // ----- Composite onto main canvas -----

    const padding = 0

    const drawSize = bottomimage.height - 2 * padding

    ctx.drawImage(
        leftCtx.canvas,
        bottomimage.width - drawSize - padding,
        padding,
        drawSize,
        drawSize
    )

    // Draw top overlay
    ctx.drawImage(topimage, 0, 0)

    return canvas.toBuffer()
}