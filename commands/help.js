const Command = require('./command')

module.exports = class help extends Command {

	static match (message)
	{
		return message.content.startsWith('// help')
	}

	static action (message)
	{
		message.channel.send({embed: {
		    color: 3447003,title: "Help",
		    description: `// ping
		    // add [type] [channel name]
		    // move [id text/voice] [id category] [int position]
		    // remove [id]

		    Pour contribuer au bot faite vos pull requests
		    https://github.com/louchebem06/bot_discord_paillaison
		    Code du bot : discord.js`,
		    timestamp: new Date(),
		    footer: {
		      text: `Help`
		    }
		  }
		});
	}
}
