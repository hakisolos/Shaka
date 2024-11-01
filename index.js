import { Client, GatewayIntentBits, Collection } from 'discord.js';
import config from './config.js';
import fs from 'fs';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a Collection to store commands
client.commands = new Collection();

// Load command files from the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.name, command.default);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
  }
});

// Use token from config.js
client.login(config.TOKEN);
