const Command 	= require('./command');
const Discord 	= require("discord.js");
const config 	= require("../config.json");
const axios		= require("axios").default;

module.exports = class horoscope extends Command
{
	static match (message)
	{
		return message.content.startsWith('// horoscope')
	}

	static action (message)
	{
		const msg = message.content;
		const av = msg.split(" ");

		if (av[2])
			var sign = av[2];
		else
		{
			const embed = new Discord.MessageEmbed()
				.setColor(`#FFFFFF`)
				.setTitle("Horoscope help")
				.setDescription(`- Aries ♈️ 🐏
				- Taurus ♉️ 🐂
				- Gemini ♊️
				- Cancer ♋️ 🦀
				- Leo ♌️ 🦁
				- Virgo ♍️
				- Libra ♎️ ⚖️
				- Scorpio ♏️ 🦂
				- Sagittarius ♐️
				- Capricorn ♑️ 🐐
				- Aquarius ♒️ 🏺
				- Pisces ♓️ 🐟`)
				.setTimestamp(new Date())

			message.channel.send({embed: embed});
			return ;
		}
		
		var options_horoscope = {
		  method: 'POST',
		  url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
		  params: {sign: sign, day: 'today'},
		  headers: {
		    'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
		    'x-rapidapi-key': config.RAPIDAPI
		  }
		};

		axios.request(options_horoscope).then(function (response)
		{
			const description 	= response.data.description;
			const compatibility = response.data.compatibility;
			const mood 			= response.data.mood;
			const color 		= response.data.color;
			const lucky_number 	= response.data.lucky_number;
			const lucky_time 	= response.data.lucky_time;

			var randomColor = Math.floor(Math.random()*16777215).toString(16);
			const embed = new Discord.MessageEmbed()
				.setColor(`#${randomColor}`)
				.setTitle("Horoscope")
				.setTimestamp(new Date())
				.setFooter(sign)
				.addField("Mood", mood, true)
				.addField("Color", color, true)
				.addField("Lucky number", lucky_number, true)
				.addField("Lucky time", lucky_time, true)
				.setDescription(description);
			
			message.channel.send({embed: embed});
		}).catch(function (error) {
			console.log(error);
			message.channel.send("❌ Error : API Horoscope");
		});
	}
}
