import { Client, Guild } from "discord.js";
import { findOrCreateDailyChannel } from "./channel";
import { postMessage } from "./post-message";
import { DAILY_CHANNEL_NAME } from "./globals";
import { addMessageReactions } from "./add-message-reactions";

export async function sendWeeklyMessage(client: Client, guild: Guild | string) {
  if (typeof guild === 'string') guild = client.guilds.cache.find(g => g.id === guild.toString()) as Guild;
  if (!guild) throw new Error('No guild found');

  const dailyChannel = await findOrCreateDailyChannel(guild, DAILY_CHANNEL_NAME);
  const dailyMessage = await postMessage(dailyChannel);
  if (dailyMessage) addMessageReactions(dailyMessage, guild, 'weekly');
}

export async function sendWeeklyMessageToEveryone(client: Client) {
  for (const [guildName, guild] of client.guilds.cache) {
    sendWeeklyMessage(client, guild);
  }
}
