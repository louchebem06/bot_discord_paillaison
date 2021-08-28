const Command = require('./command')

module.exports = class move extends Command {

	static match (message)
	{
		return message.content.startsWith('// move')
	}

	static action (message)
	{
		var data = [];
        message.guild.channels.cache
            .each(Guild => data.push(
                {
                    "type"	: Guild.type,
                    "name"	: Guild.name,
                    "id" 	: Guild.id
                }));

		const msg = message.content;
		const av = msg.split(" ");
		if (!av[2])
			message.channel.send("Yes but what ?");
		else if (av[4])
		{
			let channel_name = av[2],
				category_name = av[3],
				pos = av[4];

			var channel_id, category_id;
			for (var i = 0;data[i];i++)
			{
				if (data[i].type === 'category'
					&& data[i].name === category_name)
					category_id = data[i].id;
				if (data[i].type != 'category'
					&& data[i].name === channel_name)
					channel_id = data[i].id;
				if (category_id && channel_id)
					break;
			} 
			try
			{
				let move = message.guild.channels.cache.get(channel_id);
				move.setParent(category_id);
				move.setPosition(pos);
				message.channel.send("✅ Move succes");
			}
			catch
			{
				message.channel.send("❌ Move is not possible !");
			}
		}
		else
			message.channel.send("move [name text/voice] [name category] [int position]");
	}
}
