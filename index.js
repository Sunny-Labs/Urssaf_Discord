import { REST, Routes, Client, GatewayIntentBits  } from 'discord.js';
import 'dotenv/config'
import commands from "./src/commands.js";
import {getNextDeclarationEmbed} from "./src/urssaf_embed.js";
const {DISCORD_APP_TOKEN, DISCORD_CLIENT_ID} = process.env;


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

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'status') {
        await interaction.reply('Informations : Déclaration Trimestrielle')
        await interaction.channel.send({embeds: [getNextDeclarationEmbed(interaction.user)]})
    }
});



/** Start **/

client.login(DISCORD_APP_TOKEN);
