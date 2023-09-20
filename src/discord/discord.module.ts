import "dotenv/config";
const { DISCORD_APP_TOKEN, DISCORD_CLIENT_ID } = process.env;
if (!DISCORD_APP_TOKEN || !DISCORD_CLIENT_ID)
    throw new Error("Environment Variable Error");
import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import commands from "./discord.provider.js";
import interactions from "./discord.controller.js";

const rest: REST = new REST({ version: "10" }).setToken(DISCORD_APP_TOKEN);

try {
    console.log("Started refreshing application (/) src.");

    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) src.");
} catch (error) {
    console.error(error);
}


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
    if (!client.user) throw new Error("Client User not found");
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", interactions);

export default client;
