const Command = require('./command')

module.exports = class add extends Command {

	static match (message)
	{
		return message.content.startsWith('// add')
	}

	static action (message)
	{
		const msg = message.content;
		const av = msg.split(" ");
		if (!av[2])
			message.channel.send("Yes but what ?");
		else if (av[3])
		{
			var name = "";
			for (var i = 3;av[i];i++)
			{
				name += av[i];
				if (av[i + 1])
					name += "_";
			}
			if (av[2] === "text")
			{
				message.guild.channels.create(name, { type: 'text' });
				message.channel.send(name + " is create ✅");
			}
			else if (av[2] === "category")
			{
				message.guild.channels.create(name, { type: 'category' });
				message.channel.send(name + " is create ✅");
			}
			else if (av[2] === "voice")
			{
				message.guild.channels.create(name, { type: 'voice' });
				message.channel.send(name + " is create ✅");
			}
			else
				message.channel.send("add [text/category/voice] [channel name]");
		}
		else
			message.channel.send("add [text/category/voice] [channel name]");
	}
}
