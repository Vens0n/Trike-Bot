const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "8ball",
	description: "Ask the magic 8-ball a question.",
	type: 1,
	options: [
		{
			name: "question",
			description: "What do you want to ask the 8-ball?",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	execute: async (client, interaction, args) => {
		const question = args[0];

		const responses = ["Yes.", "No.", "Maybe?", "Absolutely, no doubt.", "Definitely not.", "Ask again later...", "Without a doubt!", "It is certain.", "Outlook good.", "Very doubtful.", "Yes – anything is possible!", "...Ben?", "I'm not so sure about that.", "Hell no. Why would you even ask that?", "WTF? No.", "Ehh... maybe, but don't count on it.", "Bro, I have *no* idea.", "Oh yeah. Allen gives it the thumbs-up.", "LMAO, not a chance.", "Y e s.", "For sure, 100%.", "Erm... sure?", "*Nods intensely* Yes.", "Absolutely not.", "Yeah, go for it!", "Uhh... that idea is... something.", "The stars say no.", "Possibly, who knows?", "Good vibes say yes!", "Why not?", "That's a mystery better left unanswered.", "You already know the answer deep down.", "Yes, but only on Tuesdays.", "Not unless you bring snacks.", "Yup. Lock it in.", "Nope. Abort mission.", "That’s a strong yes from me.", "Nah, that’s cursed.", "Yes, and the universe approves.", "Negative. Try again.", "Confirmed.", "Denied.", "Yes, but don’t tell anyone.", "Absolutely. Like, duh.", "That’s a no from the council.", "The prophecy says yes.", "Don’t count on it.", "Sure, if you're brave enough.", "Yes, but you’ll regret it.", "No, unless pigs fly.", "Mmm... spiritually, yes.", "My soul says no.", "All signs point to yes.", "All signs point to nope.", "Yes, but in an alternate reality.", "No. And don’t ask again.", "Yeah, but only with style.", "Technically... yes.", "A hard no, respectfully.", "With every fiber of my being: yes.", "Trust me, no.", "That’s a risky yes.", "If you must, then yes.", "Please don’t. So no.", "Sure... if the stars align.", "Big yes energy.", "Major nope vibes.", "Man what? I mean yes.", "sybau", "Yea", "Yes?", "Oh hell no dawg", "I'm not even going to awnser that 😭", "Yea sure why not idgaf", "Depends if it benifits you, if so then no.", "What the hell", "No. Keep yourself safe.", "I don't want to be involved.", "YOUV3 GOT TO BE A REAL [[BIG]] TO PULL OFF [[DISCOUNTED GARBAGE]] LIKE THAT!!", "[[hyerlink blocked]]", "mewo (no)", "mewo (yes)", "fuck YEAA", "Get a grip, no.", "Stop, no. Don't speak to me again, fuck you", "Go fuck yourself no", "Only if I can be your good girl", "I legitimately do not care.", "unemployed alert", "If I have to respond, then yes.", "I'll give you a yes, but you didn't hear this from me.", "bark bark bark bark bark bakrb bakrb akrbkabrkbarb kar  no", "Stop spamming questions, it pisses me off so goddam much. I'm not a therapist. No.", "No.  *im sorry*"];

		const response = responses[Math.floor(Math.random() * responses.length)];

		const embed = new EmbedBuilder()
			.setTitle("🎱 The Magic 8-Ball says...")
			.addFields({ name: "Your Question", value: question }, { name: "Answer", value: response })
			.setColor(client.config.embedColor())
			.setFooter({ text: `Asked by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

		await interaction.reply({ embeds: [embed] });
	},
};
