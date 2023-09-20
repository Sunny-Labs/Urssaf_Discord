import "dotenv/config";
const {DISCORD_APP_TOKEN} = process.env;

import client from "./discord/discord.module.js";

client.login(DISCORD_APP_TOKEN);
