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
		    // move [name text/voice] [name category] [int position]
		    // remove [type] [name]
		    // info

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
