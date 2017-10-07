const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready' () => {
console.log('ok')
})

bot.on('message', message => {


if(message.content.startsWith(bot.user + 'ping')) {
message.channel.send('Pong!')
}
  
})

bot.login(
