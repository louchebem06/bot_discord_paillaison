const Command 		= require('./command')
const config 		= require("../config.json");
const http 			= require('http');
const https 		= require('https');
const moment		= require('moment');
const momentFormat	= require("moment-duration-format");
const Discord 		= require("discord.js");
const convertapi 	= require('convertapi')(config.CONVERTAPI);
const Axios 		= require("axios");

momentFormat(moment);

function logtime(data)
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

	var tab = {
		'last_month' : last_month,
		'current_month' : current_month
	}
	return (tab);
}

function api42(token, url)
{
	return new Promise((resolve, reject) => {
		const options = {
			host : "api.intra.42.fr",
			path: url,
			headers: {Authorization: `Bearer ${token}`}
		};
		var req = https.request(options, (res) => {
			var data = '';
			res.setEncoding('utf8');
			res.on('data',(chunk) => {data += chunk});
			res.on('end', () =>{
				try{
	            	const obj = JSON.parse(data);
	            	resolve(obj);
	          	}catch (e) {reject(null)}
			}).on('error', (e) => {reject(null)});
		});
		req.end();
	});
}

function sendEmbed(token, message, login)
{
	const err_user			= "❌ Error : User not found";
	const err_api			= "❌ Error : Too many request 42 API";
	const err_apiconvert	= "❌ Error : The quota of 1500 on convert api has been exceeded";

	token = JSON.parse(token)['access_token'];
	message.channel.send("I am search");
	var req_locations = api42(token, `/v2/users/${login}/locations?per_page=100`);
	req_locations.then((locations)=>
	{
		if (locations[0])
		{
			setTimeout(() => {console.log("Pause 1 sec pour API 42");}, 1500);
			var req_coa_info = api42(token, `/v2/users/${locations[0].user.id}/coalitions`);
			req_coa_info.then((coa_info)=>
			{
				message.channel.send("Data ok");
				setTimeout(() => {console.log("Pause 1 sec pour API 42");}, 1500);
				var req_user_info = api42(token, `/v2/users/${locations[0].user.id}`);
				req_user_info.then((user_info)=>
				{
					var hours = logtime(locations);
					const url_coa 		= coa_info[0].image_url;
					const color_coa 	= coa_info[0].color;
					const full_name 	= user_info.usual_full_name;
					const url_image 	= user_info.image_url;
					const url_intra 	= `https://profile.intra.42.fr/users/${login}`;

					message.channel.send("I take care of your photo");
					convertapi.convert('png', {
					    File: url_coa,
					    FileName: login
					}, 'svg').then(function(result)
					{
						const coa_png = result.response.Files[0].Url;

						const embed = new Discord.MessageEmbed()
						.setColor(color_coa)
						.setAuthor(full_name, url_image, url_intra)
						.setTimestamp(new Date())
						.setThumbnail("https://www.42nice.fr/static/images/logo-white.png")
						
						embed.setFooter(`Logtime ${login}`, coa_png);

						embed.addField("Last month",
							hours.last_month
							,false);
						embed.addField("Current month",
							hours.current_month
							,false);

						message.channel.send({embed: embed});
					}).catch((error)=>{message.channel.send(err_apiconvert)});
				});
				req_user_info.catch((error)=>{message.channel.send(err_api)});
			})
			.catch((error)=>{message.channel.send(err_api)});
		}
		else
			message.channel.send(err_user);
	})
	.catch((error)=>{message.channel.send(err_api)});
}

const UID = config.UID_42;
const SECRET = config.SECRET_42;

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
			const url = "api.intra.42.fr";
			const querystring = require('querystring');
			const https = require('https')
			const postData = querystring.stringify({
				'grant_type': 'client_credentials',
				'client_id': `${UID}`,
				'client_secret': `${SECRET}`
			});
		
			const options = {
				"hostname": url,
				"method": "POST",
				"path" : "/oauth/token",
				"port" : 443,
				"encoding": "utf8",
				"followRedirect": true,
				"headers": {
					"Authorization": `Basic <base64 encoded client_id:client_secret>`,
					"Content-Type": 'application/x-www-form-urlencoded',
					"Content-Length": Buffer.byteLength(postData),
				},
				'muteHttpExceptions': true
				}
		
			const req = https.request(options, res => {
				res.on('data', d => {
					sendEmbed(""+d, message, av[2]);
				})
			})
			req.on('error', error => {
				console.error(error)
			})
			req.write(postData);
			req.end()
		}
		else
			message.channel.send("❌ Error : self-destruct");
	}
}
