const Discord = require('discord.js')
const bot = new Discord.Client()



bot.on('message' => {


if(message.content.startsWith(bot.user + 'ping')) {
message.channel.send('Pong!')
