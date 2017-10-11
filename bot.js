const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setPresence({ game: { name: `Type 'fergie, help'`, type: 0 } });
  console.log('I am ready!');
});

let prefix = 'fergie,'

const fergieLyrics = ["🎶 \"Heard you in the mood for a little MILFshake\"\n*https://www.youtube.com/watch?v=bsUWK-fixiA*"]

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  if(!guild.id !== '366844896742473729') return
   guild.channels.find('name', 'join-log').send('', {
      embed: {
        color: 0x4af43a,
        url: '',
        thumbnail: {url: `${member.user.avatarURL}`},
        title: `:inbox_tray: ${member.user.tag} joined.`,

        description: `You now have ${guild.memberCount} members`,
        }
      });
})

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  if(!guild.id !== '366844896742473729') return
   guild.channels.find('name', 'join-log').send('', {
      embed: {
        color: 0xdda325,
        url: '',
        thumbnail: {url: `${member.user.avatarURL}`},
        title: `:outbox_tray: ${member.user.tag} left.`,

        description: `You now have ${guild.memberCount} members`,
        }
      });
})


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
  var reason = message.content.split(' ').slice(2).join(' ');
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
  if (!message.guild.member(userToBan).bannable) {
   return message.channel.send("I cannot ban that member.")
  }
    
   message.guild.member(userToBan).ban()
   message.channel.send("👍");
   var user = message.mentions.users.first()
   message.guild.channels.find("name", "mod-log").send('', {
        embed: {
          color: 0xbc1e1e,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          url: '',
          description: `**Action:** Ban\n**Member:** ${userToBan.user.tag} (${userToBan.id})\n**Reason:** ${reason}`,
          timestamp: new Date(),
          }
        });
}
  
  if (message.content.startsWith(prefix + 'restart')) {
    if (!["298706728856453121", "229552088525438977"].includes(message.author.id)) return;
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
     message.guild.channels.find("name", "mod-log").send('', {
        embed: {
          color: 0xbc1e1e,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          url: '',
          description: `**Action:** Softban\n**Member:** ${userToSoftBan.user.tag} (${userToSoftBan.id})\n**Reason:** ${reason}`,
          timestamp: new Date(),
          }
        });
  }
  
  if (message.content.startsWith(prefix + 'randomlyric')) {
    message.channel.send(`${fergieLyrics[Math.floor(Math.random() * fergieLyrics.length)]}`)
  }
  
  if (message.content.startsWith(prefix + 'order')) {
    let orderMenuItem = message.content.split(' ').slice(1).join(' ');
    let orderChannel = message.guild.channels.find("name", "order-requests")
    if (!["298706728856453121", "229552088525438977"].includes(message.author.id)) {
      return message.reply("Sorry! This command is developer only until it becomes stable.")
    } 
      
    if (!orderMenuItem) {
      return message.reply("You didn't provide any arguments.")
    } 
      
    if (!orderChannel) {
      return message.reply("I cannot log the order as there's no \"order-requests\" channel.")
    }
      
    if (orderMenuItem !== "Milf") {
      return message.reply("Sorry, that item is not on the menu.")
    } else if (orderMenuItem !== "Fergburger"){
      return message.reply("Sorry, that item is not on the menu.")
    } else {
    message.reply("Coming right up!")
    orderChannel.send('', {
      embed: {
        color: 0xa5a5a5,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        url: '', 
        description: `**Order:** ${orderMenuItem}`,
        timestamp: new Date(),
        }
      });
    }
  }
        
  
 if (message.content.startsWith(prefix + 'help')) {
   message.reply(`You've been DMed a list of commands.`)
   message.author.send(`\`\`\`xml
< COMMANDS LIST >
fergie, ping : Checks if the bot is still alive.
fergie, help : Brings up this help list.
fergie, ban : Bans the user specified (MOD)
fergie, softban : Softbans the user specified (MOD)
fergie, randomlyric : Gets a random lyric from an array.
fergie, order : Place an order (DEV COMMAND - Temp)\`\`\``)
    message.author.send("You can also check out the commands here:\nhttps://github.com/Ellie-bot/Fergie/wiki/Fergie:-Commands")
}
});


client.login(process.env.BOT_TOKEN)
