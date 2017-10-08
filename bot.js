const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setPresence({ game: { name: `Type 'fergie, help'`, type: 0 } });
  console.log('I am ready!');
});

let prefix = 'fergie,'

client.on('message', message => {
 const prefixes = ['fergie, ', 'f:']
  let prefix = false;
  for(const thisPrefix of prefixes) {
    if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  if(!prefix) return;
  
  if (message.content.startsWith(prefix + 'ping')) {
  message.channel.send('Ping?').then(m => {
    m.edit(`Pong! - Time Taken: ${m.createdTimestamp - message.createdTimestamp}ms`)
  })
  }
  
  if (message.content.startsWith(prefix + 'ban')) {
  let userToBan = message.mentions.users.first()
  
  if (!message.member.permissions.has("BAN_MEMBERS")) {
    return message.channel.send('You do not have the required permissions to execute this command.');
  }

  if (message.author.id === message.mentions.users.first().id) {
   return message.channel.send("You cannot ban yourself.")
  }
  if (client.user.id === message.mentions.users.first().id) {
   return message.channel.send("I cannot ban myself.")
  }
  if (message.mentions.users.size === 0) {
   return message.reply("Please mention a user to ban.");
  }  
   message.guild.member(userToBan).ban()
   message.channel.send("👍");
}
  
  if (message.content.startsWith(prefix + 'restart')) {
    if (message.author.id !== "298706728856453121") {
      return message.channel.send(`You cannot use this command, ${message.author.username}.`)
    }
     message.channel.send('Rebooting...').then(() => {
       client.destroy().then(() => {
       process.exit();
     })
   })
  }
  
   if (message.content.startsWith(prefix + 'softban')) {
   var reason = message.content.split(' ').slice(2).join(' ');
   let userToSoftBan = message.mentions.users.first()
     
   if (!message.member.permissions.has("BAN_MEMBERS")) { 
     return message.channel.send("Insufficient Permissions.").catch(console.error);
   }
   if (!message.guild.member(client.user).permissions.has("BAN_MEMBERS")) {
     return message.channel.send("I cannot execute this command as I have insufficient permissions.").catch(console.error);
   }

     if (message.mentions.users.size === 0) {
       return message.channel.send("No user provided.")
     }

     if (!message.guild.member(userToSoftBan).bannable) {
       return message.channel.send("I cannot softban that member.").catch(console.error);
     }

     if (message.author.id === message.mentions.users.first().id) {
       return message.channel.send("You can't softban yourself.").catch(console.error);
     }

     if (client.user.id === message.mentions.users.first().id) {
       return message.channel.send(`I can't be softbanned, ${message.author.username}.`).catch(console.error);
     }

   userToSoftBan.ban().then(member => {message.guild.unban(member.user.id)});
     var user = message.mentions.users.first()
     const embed = new Discord.RichEmbed()
     .setTitle(`:hammer: User Softbanned: ${user.tag} (${user.id})`)
     .setColor(0xfffa00)
     .addField("Responsible Moderator:", `${message.author.tag} (${message.author.id})\n\nReason: ${reason}`)
     .setTimestamp(new Date(message.createdTimestamp))

     message.guild.channels.find("name", "mod-log").send({embed});
  }
  
 if (message.content.startsWith(prefix + 'help')) {
   message.reply(`You've been DMed a list of commands.`)
   message.author.send(`\`\`\`xml
< COMMANDS LIST >
fergie, ping : Checks if the bot is still alive.
fergie, help : Brings up this help list.
fergie, ban : Bans the user specified (MOD)
fergie, softban : Softbans the user specified (MOD)\`\`\``)
    message.author.send("You can also check out the commands here:\nhttps://github.com/Ellie-bot/Fergie/wiki/Fergie:-Commands")
}
});


client.login(process.env.BOT_TOKEN)
