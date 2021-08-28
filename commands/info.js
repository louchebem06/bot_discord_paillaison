const Command 	= require('./command')
const Discord 	= require("discord.js");

module.exports = class info extends Command
{
    static match (message)
    {
        return message.content.startsWith('// info')
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

        const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
        	.setTitle('Infos channels')
        	.setDescription('All data channels')
        	.setTimestamp(new Date())
        	.setFooter('Channels Data');
	        for (var i = 0;data[i];i++)
	        {
	            embed.addField(data[i].type,
	            		'**NAME : ** *'	+ data[i].name 	+ '*'
	            	+ 	'\n**ID : ** *' + data[i].id 	+ '*',
	            	true);
	        }

        message.channel.send({embed: embed});
    }
}
