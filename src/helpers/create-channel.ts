import { Guild, TextChannel, ChannelType } from "discord.js";

export async function createChannel(guild: Guild, channelName: string): Promise<TextChannel> {  // Create a channel within the guild and return it
  const createdChannel = await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
  });

  const channel = guild.channels.cache.get(createdChannel.id);
  return channel as TextChannel; // Ensure it is a TextChannel type
}