const Command 	= require('./command')

module.exports = class remove extends Command {

	static match (message)
	{
		return message.content.startsWith('// remove')
	}

	static action (message)
	{
		const msg = message.content;
		const av = msg.split(" ");
		if (!av[2])
			message.channel.send("Yes but what ?");
		else if (av[2])
		{
			let channel_id = av[2]
			try
			{
				const fetchedChannel = message.guild.channels.cache.get(channel_id);
				let name_channel = fetchedChannel.name,
					type_channel = fetchedChannel.type;
				fetchedChannel.delete();

				message.channel.send({embed: {
				    color: 3447003,title: "Delete",
				    description: `✅ remove succes
				    Type : ` + type_channel + `
				    Name : ` + name_channel,
				    timestamp: new Date(),
				    footer: {
				      text: `Delete`
				    }
				  }
				});
			}
			catch
			{
				message.channel.send("❌ Remove is not possible !");
			}
		}
		else
			message.channel.send("remove [id]");
	}
}
