import { Client, Collection, Guild } from "discord.js";
import { findOrCreateDailyChannel } from "./channel";
import { DAILY_CHANNEL_NAME } from "./globals";

export async function init(client: Client, guild?: Guild) {
  const guilds = guild ? new Collection<string, Guild>([['', guild as Guild]]) : client.guilds.cache
  for (const [guildName, guild] of guilds) {
    const dailyChannel = await findOrCreateDailyChannel(guild, DAILY_CHANNEL_NAME);
  }
}