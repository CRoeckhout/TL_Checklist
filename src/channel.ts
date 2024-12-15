import { Guild, TextChannel } from "discord.js";
import { createChannel } from "./helpers/create-channel";
import { lookForChannelsRecursively } from "./helpers/look-for-channel-recursively";

export async function findOrCreateDailyChannel(guild: Guild, channelName: string): Promise<TextChannel> {
  // Loop through all the guilds the bot is in
  const allChannels = guild.channels.cache;

  // Use the recursive function to search for the channel
  const dailyChannels = await lookForChannelsRecursively(allChannels, channelName);

  if (dailyChannels.length > 0) {
    console.log(`Found daily channel(s) in guild "${guild.name}":`);
    return dailyChannels[0] as TextChannel;
  } else {
    console.log(`No daily channel found in guild "${guild.name}", creating a "${channelName}" channel.`);
    return await createChannel(guild, channelName);
  }
}