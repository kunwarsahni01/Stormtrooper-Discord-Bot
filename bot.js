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
    message.author.sendMessage('```Commands:!ping: quick command to see if bot is running, !avatar: command birngs up users profile picture, !webhook: test webhook functionality, !help: use command for list of commands, !say: text after this command will be repeated by the bot, !add: any numbers spaced out after this command, and many more coming soon. For furter support or any help please join: https://discord.gg/G9u4Ryv                                                                                                                                                                                                                 Version: Mark 0.2, BETA BUILD```');
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
