const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setPresence({ game: { name: `Type 'fergie, help'`, type: 0 } });
  console.log('I am ready!');
});

const prefix = 'fergie,'

client.on('message', message => {
  if (message.content.startsWith(prefix + ' ping')) {
  message.channel.send('Ping?').then(m => {
    m.edit(`Pong! - Time Taken: ${m.createdTimestamp - message.createdTimestamp}ms`)
  })
  }
  
  if (message.content.startsWith(prefix + ' ban')) {
  let userToBan = message.mentions.users.first()
  
  if (!message.member.permissions.has("BAN_MEMBERS")) {
    return message.channel.send('You do not have the required permissions to execute this command.');
  }

  if (message.author.id === message.mentions.users.first().id) {
   return message.channel.send("You can't ban yourself!")
  }
  if (client.user.id === message.mentions.users.first().id) {
   return message.channel.send("I can't ban myself!")
  }
  if (message.mentions.users.size === 0) {
   return message.reply("Please mention a user to ban.");
  }  
   message.guild.member(userToBan).ban()
   message.channel.send("👍");
}
  
  if (message.content.startsWith(prefix + ' restart')) {
    if (message.author.id !== "298706728856453121") {
      return message.channel.send(`You cannot use this command, ${message.author.username}.`)
    }
     message.channel.send('Rebooting...').then(() => {
       client.destroy().then(() => {
       process.exit();
     })
   })
  }
  
 if (message.content.startsWith(prefix + ' help')) {
   message.reply(`You've been DMed a list of commands.`)
   message.author.send(`\`\`\`xml
< COMMANDS LIST >
fergie, ping : Checks if the bot is still alive.
fergie, help : Brings up this help list.
fergie, ban : Bans the user specified (MOD)\`\`\``)
    message.author.send("You can also check out the commands here:\nhttps://github.com/Ellie-bot/Fergie/wiki/Fergie:-Commands")
}
});


client.login(process.env.BOT_TOKEN)
