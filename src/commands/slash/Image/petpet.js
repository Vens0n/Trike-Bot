const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const Canvas = require('canvas')
const GIFEncoder = require('gifencoder')
const path = require('path')
const fs = require('fs')

module.exports = {
    name: "image-petpet",
    description: "petpet a user's avatar.",
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
        let message = null;

        if (attachment) {
            pfpurl = attachment.url;
        } else if (url) {
            pfpurl = url;
        } else if (user) {
            message = `Petpetting ${user}'s avatar...`
            pfpurl = user.displayAvatarURL({ extension: 'png', size: 512 });

        } else {
            return interaction.reply({ content: "Please provide a user, URL, or attachment to use for the image.", ephemeral: true });
        }

        const petpetGif = await petpet(pfpurl)

        interaction.reply({
            content: message,
            files: [{
                attachment: petpetGif,
                name: "petpet.gif"
            }]
        });
        
    },
};


async function petpet(pfpurl) {

    const FRAMES = 10

    const petGifCache = []

    var resolution = 112
    var delay = 20


    // Create GIF encoder
    const encoder = new GIFEncoder(resolution, resolution)

    encoder.start()
    encoder.setRepeat(0)
    encoder.setDelay(delay)
    encoder.setTransparent()

    // Create canvas and its context
    const canvas = Canvas.createCanvas(resolution, resolution)
    const ctx = canvas.getContext('2d')

    const avatar = await Canvas.loadImage(pfpurl)

    // Loop and create each frame
    for (let i = 0; i < FRAMES; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const j = i < FRAMES / 2 ? i : FRAMES - i

        const width = 0.8 + j * 0.02
        const height = 0.8 - j * 0.05
        const offsetX = (1 - width) * 0.5 + 0.1
        const offsetY = (1 - height)

        if (i == petGifCache.length) petGifCache.push(await Canvas.loadImage(path.resolve(__dirname, `./data/petpet/pet${i}.gif`)))

        ctx.drawImage(avatar, resolution * offsetX, resolution * offsetY, resolution * width, resolution * height)
        ctx.drawImage(petGifCache[i], 0, 0, resolution, resolution)

        encoder.addFrame(ctx)
    }

    encoder.finish()
    return encoder.out.getData()
}