const Discord = require('discord.js');

module.exports = {
    name: "say",
  	options: [{
  		name: 'channel',
  		description: 'channel',
  		type: 'CHANNEL',
  		required: true
  	}, {
        name: 'doembed',
        description: 'doembed',
        type: 'BOOLEAN',
        required: true
    }, {
        name: 'content',
        description: 'content',
        type: 'STRING',
        required: false
    }, {
        name: 'title',
        description: 'title',
        type: 'STRING',
        required: false
    }, {
        name: 'color',
        description: 'color',
        type: 'STRING',
        required: false
    }, {
        name: 'desrc',
        description: 'description',
        type: 'STRING',
        required: false
    }, {
        name: 'footer',
        description: 'footer',
        type: 'STRING',
        required: false
    }],
    description: "Send said message to said place",
    ownerOnly: true,
    version: "1",
    run: async (client, interaction) => {

        const doembed = interaction.options.getBoolean("doembed");
        const channel = interaction.options.getChannel("channel");


        const context = interaction.options.getString("content");
        const title = interaction.options.getString("title");
        const color = interaction.options.getString("color");
        const description = interaction.options.getString("desrc");
        const footer = interaction.options.getString("footer");

        if(doembed) {
            channel.send({
                content: context,
                embeds: [
                    {
                        title: title,
                        color: color,
                        description: description,
                        footer: {
                            text: footer
                        }
                    }
                ]
            })
        } else {
            channel.send(context)
        }

    },
};
