const Command 	= require('./command')

module.exports = class remove extends Command {

	static match (message)
	{
		return message.content.startsWith('// remove')
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
		else if (av[3])
		{
			for (var i = 0;data[i];i++)
			{
				if (av[2] === data[i].type
					&& av[3] === data[i].name)
				{
					try
					{
						const fetchedChannel = message.guild.channels.cache.get(data[i].id);
						fetchedChannel.delete();

						message.channel.send({embed: {
						    color: 3447003,title: "Delete",
						    description: `✅ remove succes
						    Type : ` + data[i].type + `
						    Name : ` + data[i].name,
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
			}
		}
		else
			message.channel.send("remove [type] [name]");
	}
}
