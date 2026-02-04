const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const Canvas = require('canvas')
const GIFEncoder = require('gifencoder')
const path = require('path')
const fs = require('fs')

module.exports = {
    name: "image-worsethanepstein",
    description: "Make a meme 'Is [user] Worse than Epstein!?'.",
    type: 1,
    coolDownTime: 2 * 60, // 2 minutes
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
        let username = null;
        let message = null;

        if (attachment) {
            pfpurl = attachment.url;
        } else if (url) {
            pfpurl = url;
        } else if (user) {
            if (user.id == 638368326996983848) return interaction.reply({ content: "fuck you lmao", ephemeral: true });
            message = `Is ${user} Worse than Epstein!?`
            username = user.displayName || user.username;
            pfpurl = user.displayAvatarURL({ extension: 'png', size: 512 });

        } else {
            return interaction.reply({ content: "Please provide a user, URL, or attachment to use for the image.", ephemeral: true });
        }
        let worsethanGif;
        try {
            worsethanGif = await worsethanepstein(pfpurl, username)
        } catch (error) {
            return interaction.reply({ content: "An error occurred while generating the image.", ephemeral: true });
        }
		await client.cooldownDB.set(`cooldown_${module.exports.name}_${interaction.user.id}`, Date.now() + module.exports.coolDownTime * 1000);

        interaction.reply({
            content: message,
            files: [{
                attachment: worsethanGif,
                name: "worsethanepstein.gif"
            }]
        });
        
    },
};

async function worsethanepstein(userpfpurl, username) {

    const bottomimage = await Canvas.loadImage(path.resolve(__dirname, "./data/worsethanepstein/bottom.png"))
    const topimage = await Canvas.loadImage(path.resolve(__dirname, "./data/worsethanepstein/top.png"))
    const leftimage = await Canvas.loadImage(userpfpurl)

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

    // Grayscale
    const imgData = leftCtx.getImageData(
        0,
        0,
        leftCanvas.width,
        leftCanvas.height
    )

    const amount = 0.7
    for (let i = 0; i < imgData.data.length; i += 4) {

        const r = imgData.data[i]
        const g = imgData.data[i + 1]
        const b = imgData.data[i + 2]

        const gray = (r + g + b) / 3

        imgData.data[i] = r * (1 - amount) + gray * amount
        imgData.data[i + 1] = g * (1 - amount) + gray * amount
        imgData.data[i + 2] = b * (1 - amount) + gray * amount
    }

    leftCtx.putImageData(imgData, 0, 0)

    // ----- Rotate without clipping -----

    const maxSide = Math.max(leftCanvas.width, leftCanvas.height)
    const diag = Math.sqrt(maxSide * maxSide * 2)

    const rotatedCanvas = Canvas.createCanvas(diag, diag)
    const rotatedCtx = rotatedCanvas.getContext('2d')

    rotatedCtx.translate(diag / 2, diag / 2)
    rotatedCtx.rotate(-2 * Math.PI / 180)

    rotatedCtx.drawImage(
        leftCanvas,
        -leftCanvas.width / 2,
        -leftCanvas.height / 2
    )
    // ----- Composite onto main canvas -----

    const drawSize = bottomimage.height + 120

    ctx.drawImage(
        rotatedCanvas,
        -80,
        -50,
        drawSize,
        drawSize
    )

    // Draw top overlay
    ctx.drawImage(topimage, 0, 0)

    return canvas.toBuffer()
}