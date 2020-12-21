const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '//';

const fs = require('fs');

const guild = client.guilds.cache.get("YOUR_GUILD_ID");

client.commands = new Discord.Collection();

require('dotenv').config()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot is ready and online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/); //for multiple arguments
    const command = args.shift().toLowerCase();

    if (command === 'ping') { //reads out commands from chat
        client.commands.get('ping').execute(message, args);
    } else if (command === 'test') {
        client.commands.get('test').execute(message, args);
    } else if (command === 'deaf' || command === 'd') {
        client.commands.get('deaf').execute(message, args);
    } else if (command === 'undeaf' || command === 'ud') {
        client.commands.get('undeaf').execute(message, args);
    } else if (command === 'mute' || command === 'm') {
        client.commands.get('mute').execute(message, args);
    } else if (command === 'unmute' || command === 'um') {
        client.commands.get('unmute').execute(message, args);
    } else if (command === 'meme') {
        client.commands.get('meme').execute(message, args);
    } else if (command === 'cat') {
        client.commands.get('cat').execute(message, args);
    } else if (command === 'nature') {
        client.commands.get('nature').execute(message, args);
    } else if (command === 'catfact' || command === 'cat_fact') {
        client.commands.get('catfact').execute(message, args);
    } else if (command === 'fact') {
        client.commands.get('fact').execute(message, args);
    }
})

client.on('ready', async () => {
    await client.user.setPresence({
        game: {
            name: 'to //',
            type: 'LISTENING'
        },
        status: 'online'
    });
});

client.login(process.env.DISCORD_TOKEN); //keep at last line of file