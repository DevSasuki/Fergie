const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setPresence({ game: { name: `Type '@Fergie ping'!`, type: 0 } });
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.startsWith(client.user + ' ping')) {
    message.reply(`Pong! ${message.createdTimestamp - message.createdTimestamp}ms`);
  }
});


client.login(process.env.BOT_TOKEN)
