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
			if (av[2] === "text")
			{
				var name = "";
				for (var i = 3;av[i];i++)
				{
					name += av[i];
					if (av[i + 1])
						name += "_";
				}
				message.guild.channels.create(name);
				message.channel.send(name + " is create ✅");
			}
			else if (av[2] === "vocal")
			{
				message.channel.send("In progress");
			}
			else
				message.channel.send("Please input type [text] or [vocal]");
		}
		else
			message.channel.send("// add [text/vocal] [channel name]");
	}
}
