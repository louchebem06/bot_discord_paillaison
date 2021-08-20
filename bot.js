/*npm install -g forever
forever start server.js*/
//https://discord.com/api/oauth2/authorize?client_id=878346702023716895&permissions=8&scope=bot
const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client();

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
bot.user.setAvatar('paillasson.jpeg')
	.then(user => console.log(`My avatar is upload`))
		.catch(console.error);
bot.user.setUsername('La paillasse')
	.then(user => console.log(`My new username is ${user.username}`))
		.catch(console.error);
bot.user.setActivity(`42`)
	.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error)
});

bot.on('message', function(msg)
{
	const message = msg.content;
	const av = message.split(" "); 
	if (av[0] && av[0] === '//')
	{
		if (av[1] && !av[2])
			msg.channel.send("Yes but what ?");
		else if (av[1])
		{
			if (av[1] === 'add')
				msg.guild.channels.create(av[2]);
			else if (av[1] === 'del')
			{
				if (av[2] === 'this')
					msg.channel.delete();
			}
		}
		else
			msg.channel.send("please input action");
	}
});

bot.login(config.BOT_TOKEN);