import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the bot client with necessary intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the bot is ready, log to the console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Handle interactions (commands)
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// Log in to Discord with the bot token
client.login(process.env.TOKEN);
