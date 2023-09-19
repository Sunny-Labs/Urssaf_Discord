import { REST, Routes, Client, GatewayIntentBits  } from 'discord.js';

import 'dotenv/config'
const {DISCORD_APP_TOKEN, DISCORD_CLIENT_ID} = process.env;

import commands from "./commands.js";
import interactions from './interactions.js';


const rest = new REST({ version: '10' }).setToken(DISCORD_APP_TOKEN);

/** Commands Init **/

try {
    console.log('Started refreshing application (/) src.');

    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) src.');
} catch (error) {
    console.error(error);
}

/** Client Init **/

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', interactions);

export default client;
