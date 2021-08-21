const Command = require('./command')

module.exports = class help extends Command {

	static match (message)
	{
		return message.content.startsWith('// help')
	}

	static action (message)
	{
		message.channel.send("activation commande //");
		message.channel.send("ping");
		message.channel.send("add [text/vocal] [channel name]");
		message.channel.send("Pour contribuer au bot faite vaut pull request https://github.com/louchebem06/bot_discord_paillaison {discord.js}");
	}
}
