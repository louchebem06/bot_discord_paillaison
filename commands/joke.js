const Command 		= require('./command');
const Discord 		= require("discord.js");
const config 		= require("../config.json");
const BlaguesAPI 	= require('blagues-api');

module.exports = class joke extends Command
{
	static match (message)
	{
		return message.content.startsWith('// joke')
	}

	static action (message)
	{
		const msg = message.content;
		const av = msg.split(" ");

		const blagues = new BlaguesAPI(config.BLAGUESAPI);

		if (av[2] === 'global')
			var joke = blagues.randomCategorized(blagues.categories.GLOBAL);
		else if (av[2] === 'dev')
			var joke = blagues.randomCategorized(blagues.categories.DEV);
		else if (av[2] === 'dark')
			var joke = blagues.randomCategorized(blagues.categories.DARK);
		else if (av[2] === 'limit')
			var joke = blagues.randomCategorized(blagues.categories.LIMIT);
		else if (av[2] === 'beauf')
			var joke = blagues.randomCategorized(blagues.categories.BEAUF);
		else if (av[2] === 'blondes')
			var joke = blagues.randomCategorized(blagues.categories.BLONDES);
		else
			var joke = blagues.random();

		joke.then((blague) => {
			var randomColor = Math.floor(Math.random()*16777215).toString(16);
			const embed = new Discord.MessageEmbed()
				.setColor(`#${randomColor}`)
				.setTitle(blague.type)
				.setDescription(blague.joke)
				.setTimestamp(new Date())
				.setFooter(`id : ${blague.id}`)
				.addField("answer", blague.answer, false);

			message.channel.send({embed: embed});
		})
	}
}
