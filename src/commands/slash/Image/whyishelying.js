const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const Canvas = require('canvas')
const GIFEncoder = require('gifencoder')
const path = require('path')
const fs = require('fs')

module.exports = {
    name: "image-whyishelying",
    description: "Lying Wong meme generator.",
    type: 1,
    //coolDownTime: 2 * 60, // 2 minutes
    //!           M x SS
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
        let message = null;

        if (attachment) {
            pfpurl = attachment.url;
        } else if (url) {
            pfpurl = url;
        } else if (user) {
            pfpurl = user.displayAvatarURL({ extension: 'png', size: 512 });

        } else {
            return interaction.reply({ content: "Please provide a user, URL, or attachment to use for the image.", ephemeral: true });
        }
        let lyingwongGif;
        try {
            lyingwongGif = await whyishelying(pfpurl)
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "An error occurred while generating the image.", ephemeral: true });
        }
		await client.cooldownDB.set(`cooldown_${module.exports.name}_${interaction.user.id}`, Date.now() + module.exports.coolDownTime * 1000);

        interaction.reply({
            content: message,
            files: [{
                attachment: lyingwongGif,
                name: "whyishelying.gif"
            }]
        });
        
    },
};

async function whyishelying(userpfpurl) {

    const topimage = await Canvas.loadImage(path.resolve(__dirname, "./data/whyishelying/lying-wong.png"))
    const leftimage = await Canvas.loadImage(userpfpurl)

    // Main canvas
    const canvas = Canvas.createCanvas(
        topimage.width,
        topimage.height
    )
    const ctx = canvas.getContext('2d')

    // Draw bottom layer
    ctx.drawImage(topimage, 0, 0)

    // ----- Prepare left image -----

    const leftCanvas = Canvas.createCanvas(
        leftimage.width,
        leftimage.height
    )
    const leftCtx = leftCanvas.getContext('2d')

    leftCtx.drawImage(leftimage, 0, 0)

    // ----- Rotate without clipping -----

    const maxSide = Math.max(leftCanvas.width, leftCanvas.height)
    const diag = Math.sqrt(maxSide * maxSide * 2)

    const rotatedCanvas = Canvas.createCanvas(diag, diag)
    const rotatedCtx = rotatedCanvas.getContext('2d')

    rotatedCtx.translate(diag / 2, diag / 2)
    rotatedCtx.rotate(-14 * Math.PI / 180)

    rotatedCtx.drawImage(
        leftCanvas,
        -leftCanvas.width / 2,
        -leftCanvas.height / 2
    )
    // ----- Composite onto main canvas -----

    const drawSize = topimage.height - 70


    ctx.drawImage(
        rotatedCanvas,
        215, // X position
        45,  // Y position
        drawSize,
        drawSize
    )
    ctx.drawImage(topimage, 0, 0)
    // Draw top overlay

    return canvas.toBuffer()
}