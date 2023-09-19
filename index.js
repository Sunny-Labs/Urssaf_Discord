import 'dotenv/config'
const {DISCORD_APP_TOKEN} = process.env;

import client from "./client/client.js";

client.login(DISCORD_APP_TOKEN);
