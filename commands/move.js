const Command = require('./command')

module.exports = class move extends Command {

	static match (message)
	{
		return message.content.startsWith('// move')
	}

	static action (message)
	{
		const msg = message.content;
		const av = msg.split(" ");
		if (!av[2])
			message.channel.send("Yes but what ?");
		else if (av[4])
		{
			let channel_id = av[2],
				category_id = av[3],
				pos = av[4];

			try
			{
				const fetchedChannel = message.guild.channels.cache.get(channel_id);
				fetchedChannel.setParent(category_id);
				fetchedChannel.setPosition(pos);
				message.channel.send("✅ Move succes");
			}
			catch
			{
				message.channel.send("❌ Move is not possible !");
			}
		}
		else
			message.channel.send("move [id text/voice] [id category] [int position]");
	}
}
