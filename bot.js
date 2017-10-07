const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setPresence({ game: { name: `Type '@Fergie ping'!`, type: 0 } });
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.startsWith(client.user + ' ping')) {
  message.channel.send('Ping?').then(m => {
    m.edit(`Pong! - Time Taken: ${m.createdTimestamp - message.createdTimestamp}ms`)
  })
  }
  
  if (message.content.startsWith(client.user + ' help')) {
    message.reply(`You've been DMed a list of commands.`)
    message.author.send(`\`\`\`xml
< COMMANDS LIST >
@Fergie ping : Checks if the bot is still alive.
@Fergie help : Brings up this help list.\`\`\``)
}
});


client.login(process.env.BOT_TOKEN)
