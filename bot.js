 const Discord = require('discord.js');
 const client = new Discord.Client();
 const newUsers = [];
 const config = require ("./config.json");

client.on('ready', () => {
    console.log('Hello World!');
    client.user.setGame('Type !help for help', 'Online');
});

const prefix = "!";

const hook = new Discord.WebhookClient('295876945475010570', 'g-nt7KvObOOcc3Fhr1Vq4vciR2v6Jzz_FInZy0XBeJ_YkPNmst3c_3zEMJkn2X-jMU4T');
hook.sendMessage('I am now alive!');

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage("Welcome! " + member.user);
});

client.on("guildCreate", guild =>{
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`)
});

client.on('message', message => {
  if(message.author.bot)return;
  if(!message.content.startsWith(config.prefix))return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if(command === "add"){
    let numArray = args.map (n=> parseInt(n));
    let total = numArray.reduce( (p,c) => p+c);
    message.channel.sendMessage(total);
  }

  if(command === "say"){
    message.channel.sendMessage(args.join(" "));
  }

  if (command === "help"){
    message.channel.sendMessage('I have sent you a list of commands in your Direct Messages');
    message.author.sendMessage('```To see a list of commands visit: https://kunwarsahni01.github.io/Stormtrooper-Discord-Bot/  Version: Mark 0.3, BETA BUILD```');
    message.author.sendMessage('```For further support please join: https://discord.gg/YucSE7t```')
  }

  if (command === "hello"){
	  message.channel.sendMessage('I will shoot you, Rebel Scum!, ' + message.author.username);
	}

  if(command === "ping"){
    message.channel.sendMessage('pong');
  }

  if(command === "avatar"){
    message.channel.sendMessage(message.author.avatarURL);
  }

  if(command === "webhook"){
    message.channel.sendMessage(hook.sendMessage('Webhooks Work!'))
  }
});

client.login(config.token);
