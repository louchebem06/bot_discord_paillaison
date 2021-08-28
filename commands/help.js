const Command = require('./command')
const Discord = require("discord.js");

module.exports = class help extends Command
{
	static match (message)
	{
		return message.content.startsWith('// help')
	}

	static action (message)
	{
		const embed = new Discord.MessageEmbed()
			.setColor('#E51B42')
        	.setTitle('Help')
        	.setDescription(`To contribute to the bot, make your pull requests
			    https://github.com/louchebem06/bot_discord_paillaison
			    #discord.js`)
        	.setTimestamp(new Date())
        	.setFooter('Help - Command bot');

            embed.addField("// ping",
            	`The bot will answer you pong`
            	,false);
            embed.addField("// info",
            	`Return all the server channel info`
            	,false);
            embed.addField("// add",
            	`add [type] [channel name]
            	Create a channel of the type with its name
            	type : text, voice, activity`
            	,false);
            embed.addField("// move",
            	`move [type] [category name] [index]
            	Will move the chanel in the category at index x
            	type : text, voice, activity`
            	,false);
            embed.addField("// remove",
            	`remove [type] [name]
            	Suppress the channel
            	type : text, voice, activity`
            	,false);
            embed.addField("// set",
            	`set name [New USERNAME]
            	set [activity/image] [value] (in progress)`
            	,false);

        message.channel.send({embed: embed});
	}
}
