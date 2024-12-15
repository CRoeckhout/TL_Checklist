import { ChannelType, Collection, GuildBasedChannel } from "discord.js";

export async function lookForChannelsRecursively(channelCollection: Collection<string, GuildBasedChannel>, channelName: string): Promise<any[]> {
  // Recursively look for the channel within the collection of channels (including child channels)
  const result: any[] = [];

  // Iterate over each channel in the collection using `for...of`
  for (const channel of channelCollection.values()) {
    // If this is a category, check its child channels recursively
    if (channel.type === ChannelType.GuildCategory) {
      const childChannels = channel.guild.channels.cache.filter((child: any) => child.parentId === channel.id);
      const foundInChild = await lookForChannelsRecursively(childChannels, channelName);
      result.push(...foundInChild);
    }

    // If the channel matches the name you're looking for, add it to the result
    if (channel.name.toLowerCase() === channelName.toLowerCase()) {
      result.push(channel);
    }
  }

  return result;
}