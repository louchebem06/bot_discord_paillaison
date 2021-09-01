const Command 		= require('./command')
const config 		= require("../config.json");
const http 			= require('http');
const https 		= require('https');
const moment		= require('moment');
const momentFormat 	= require("moment-duration-format");
const Discord 		= require("discord.js");

momentFormat(moment);

function data_req(token, message, user)
{
	const options = {
		host : "api.intra.42.fr",
		path: `/v2/users/${user}/locations?per_page=100`,
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	var req = https.request(options, function(res)
	{
		res.setEncoding('utf8');
		var data = ''
		res.on('data', function (chunk)
		{
			data += chunk;
		});
		res.on('end', function ()
		{
			const obj = JSON.parse(data);
			logtime(obj, message);
		});
	});
	req.on('error', function(e) {
	  message.channel.send("❌ Error : user is not valid");
	});
	req.end();
}

function fmod(a, b)
{
	var x = Math.floor(a/b);
	return (a - b*x);
}

function logtime(data, message)
{
	if (data[0])
	{
		prev_month_i = moment().utc().subtract(1,"month").month();
		final = moment().utc();
		this_final = moment().utc();
		for (var i = 0; data[i]; i++)
		{
			this_end = moment(data[i].end_at);
			this_begin = moment(data[i].begin_at);
			if (prev_month_i == moment(data[i].begin_at).month())
			{
				if (data[i].end_at === null)
					final.add(moment().utc().subtract(this_begin));
				else if (this_end.month() === moment().utc().month())
				{
					final.add(this_end.clone().hour(0).minute(0).subtract(this_begin));
					this_final.add(this_end.subtract(this_end.clone().hour(0).minute(0)))
				}
				else
					final.add(this_end.subtract(this_begin));
			}
			else if (moment().utc().month() == moment(data[i].begin_at).month())
			{
				if (data[i].end_at === null)
					this_final.add(moment().utc().subtract(this_begin));
				else
					this_final.add(this_end.subtract(this_begin));
			}
		}
		var last_month = moment.duration(final.subtract(moment())).format("h:mm");
		var current_month = moment.duration(this_final.subtract(moment())).format("h:mm");

		/*
			add color coa
			logo coa
			Photo utilisateur
			nom
		*/

		const embed = new Discord.MessageEmbed()
			.setColor('#A061D1')
        	.setTitle('Logtime (in progress)')
        	.setDescription(`Logtime (in progress)`)
        	.setTimestamp(new Date())
        	.setFooter('Logtime (in progress)');

        embed.addField("Last month",
        	last_month
        	,false);
        embed.addField("Current month",
        	current_month
        	,false);

        message.channel.send({embed: embed});
	}
	else
		message.channel.send("❌ Error : user is not valid");
}

module.exports = class log extends Command
{
	static match (message)
	{
		return message.content.startsWith('// log')
	}

	static action (message)
	{
		const msg = message.content;
		const av = msg.split(" ");
		if (av[2] && !av[3])
		{
			const baddel_token = config.BADDEL_TOKEN;
			const REQ = 'http://baddel.fr/discord/bot.php?json&token='+config.BADDEL_TOKEN;
			var request = http.request(REQ, function (res)
			{
			    var data = '';
			    res.on('data', function (chunk)
			    {
			        data += chunk;
			    });
			    res.on('end', function ()
			    {
			       	data_req(data, message, av[2]);
			    });
			});
			request.on('error', function (e)
			{
			    message.channel.send("❌ Error : baddel in PLS");
			    return ;
			});
			request.end();
		}
		else
			message.channel.send("❌ Error : self-destruct");
	}
}
