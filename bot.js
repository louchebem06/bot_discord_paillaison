/*npm install -g forever
forever start server.js*/
//https://discord.com/api/oauth2/authorize?client_id=878346702023716895&permissions=8&scope=bot
const Discord 	= require("discord.js");
const config 	= require("./config.json");
const bot 		= new Discord.Client();

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
// bot.user.setAvatar('paillasson.jpeg')
// 	.then(user => console.log(`My avatar is upload`))
// 	.catch(console.error);
bot.user.setUsername('La paillasse')
	.then(user => console.log(`My new username is ${user.username}`))
	.catch(console.error);
bot.user.setActivity("42 Nice", {type: "COMPETING"})
	.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
	.catch(console.error);
});

bot.on('guildMemberAdd', function (member)
{
	member.createDM().then(function (channel)
	{
		return channel.send('Welcome to Team Paillasson ' + member.displayName + ', this is secret groupe 42Nice')
	}).catch(console.error)
})

const ping 		= require('./commands/ping');
const add 		= require('./commands/add');
const help 		= require('./commands/help');
const move 		= require('./commands/move');
const remove 	= require('./commands/remove');
const info 		= require('./commands/info');
const set 		= require('./commands/set');
const log 		= require('./commands/log');

bot.on('message', function (message)
{
  if (message.author.bot)
	return;
  let commandUsed =
    ping.parse(message) 	||
    add.parse(message) 		||
    help.parse(message) 	||
    move.parse(message) 	||
    remove.parse(message)	||
    info.parse(message)		||
    set.parse(message)		||
    log.parse(message)
})

bot.login(config.BOT_TOKEN);
