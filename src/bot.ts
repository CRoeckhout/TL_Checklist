import { Client, GatewayIntentBits } from 'discord.js';
import schedule from 'node-schedule';
import { TOKEN } from "./globals";
import { init } from './init';
import { sendDailyMessageToEveryone } from './send-daily-message-to-everyone';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  init(client);

  // Cron to send the message to every server it's on
  schedule.scheduleJob('0 9 * * *', async () => sendDailyMessageToEveryone(client));
});

client.on('guildCreate', async (guild) => {
  init(client);
  schedule.scheduleJob('0 9 * * *', async () => sendDailyMessageToEveryone(client));
})

client.login(TOKEN);