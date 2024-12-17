import { TextChannel } from "discord.js";
import moment from "moment";

export async function findDailyMessage(channel: TextChannel): Promise<string | null> {
  const messages = await channel.messages.fetch({ limit: 100 });
  const previousDay = moment().subtract(1, 'days');


  // Filter messages from the previous day
  const messagesFromPreviousDay = messages
    .filter(msg => moment(msg.createdTimestamp).isSame(previousDay, 'day'))
    .filter(msg => msg.content.startsWith('!DAILY!'));


  if (messagesFromPreviousDay.size === 0) {
    console.log('No messages from the previous day found.');
    return null;
  }

  //DEV PURPOSE ONLY
  // (await channel.messages.fetch()).forEach(msg => msg.delete());

  // Format and post the messages
  return messagesFromPreviousDay
    .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
    .map(msg =>
      msg.content
    ).join('\n');
}