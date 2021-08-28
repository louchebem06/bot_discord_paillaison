const Command = require('./command')

module.exports = class set extends Command
{
	static match (message)
	{
		return message.content.startsWith('// set')
	}

	static action (message)
	{
		const msg	= message.content;
		const av	= msg.split(" ");
		if (!av[2])
			message.channel.send("Yes but what ?");
		else if (av[3])
		{
			var value = av[3];
			for (var i = 4;av[i];i++)
				value += " " + av[i];
			if (av[2] == 'name')
			{
				if (value.length <= 32)
					message.guild.me.setNickname(value);
				else
					message.channel.send("❌ Change username is imposible");
			}
			else if (av[2] == 'activity')
			{
				message.channel.send("in progress");
			}
			else if (av[2] == 'image')
			{
				message.channel.send("in progress");
			}
		}
		else
			message.channel.send("set [name/activity/avatar] [value/url_img]");
	}
}
