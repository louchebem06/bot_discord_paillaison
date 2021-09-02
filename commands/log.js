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
			logtime(obj, message, token);
		});
	});
	req.on('error', function(e) {
	  message.channel.send("❌ Error : user is not valid");
	});
	req.end();
}

function sendEmbed(url_coa, color_coa, last_month, current_month, message, login, full_name, url_image)
{
	/*
		url_coa
		is svg file
		svg is not support by discord
		convert svg to png for view in footer
	*/
	const url_intra = `https://profile.intra.42.fr/users/${login}`;
	const embed = new Discord.MessageEmbed()
		.setColor(color_coa)
    	.setTitle(`Logtime ${login}`)
    	.setAuthor(full_name, url_image, url_intra)
    	.setTimestamp(new Date())
    	.setFooter(`Logtime ${login}`, url_coa);

    embed.addField("Last month",
    	last_month
    	,false);
    embed.addField("Current month",
    	current_month
    	,false);

    message.channel.send({embed: embed});
}

function coaInfo(token, last_month, current_month, id_user, message, login, full_name, url_image)
{
	const options = {
		host : "api.intra.42.fr",
		path: `/v2/users/${id_user}/coalitions`,
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
			const coa_info = JSON.parse(data);

			const url_coa 	= coa_info[0].image_url;
			const color_coa 	= coa_info[0].color;

			sendEmbed(url_coa, color_coa, last_month, current_month, message, login, full_name, url_image);
		});
	});
	req.on('error', function(e) {
	  message.channel.send("❌ Error : Message create");
	});
	req.end();
}

function userInfo(token, last_month, current_month, id_user, message)
{
	setTimeout(() => {console.log("Pause 2 sec pour API 42");}, 2000);
	const options = {
		host : "api.intra.42.fr",
		path: `/v2/users/${id_user}`,
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
			const user_info = JSON.parse(data);

			const login 	= user_info.login;
			const full_name = user_info.usual_full_name;
			const url_image = user_info.image_url;

			coaInfo(token, last_month, current_month, id_user, message, login, full_name, url_image);
		});
	});
	req.on('error', function(e) {
	  message.channel.send("❌ Error : Message create");
	});
	req.end();
}

function logtime(data, message, token)
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

		const id_user = data[0].user.id;

		userInfo(token, last_month, current_month, id_user, message)
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
