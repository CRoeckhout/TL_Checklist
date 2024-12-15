import { Client } from "discord.js";
import { findOrCreateDailyChannel } from "./channel";
import { postMessage } from "./post-message";
import { DAILY_CHANNEL_NAME } from "./globals";

export async function sendDailyMessageToEveryone(client: Client) {
  for (const [guildName, guild] of client.guilds.cache) {
    const dailyChannel = await findOrCreateDailyChannel(guild, DAILY_CHANNEL_NAME);
    postMessage(dailyChannel);
  }
}
