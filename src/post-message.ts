import { TextChannel } from "discord.js";
import moment from 'moment';

export async function postMessage(channel: TextChannel) {
  try {
    if (!channel) {
      console.error('Channel not found.');
      return;
    }

    const messages = await channel.messages.fetch({ limit: 100 });
    const previousDay = moment().subtract(0, 'days');


    // Filter messages from the previous day
    const messagesFromPreviousDay = messages.filter(msg => {
      const messageDate = moment(msg.createdTimestamp);
      return messageDate.isSame(previousDay, 'day');
    });


    if (messagesFromPreviousDay.size === 0) {
      console.log('No messages from the previous day found.');
      return;
    }

    //DEV PURPOSE ONLY
    (await channel.messages.fetch()).forEach(msg => msg.delete());

    // Format and post the messages
    const combinedMessages = messagesFromPreviousDay
      .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
      .map(msg =>
        msg.content
      ).join('\n');

    const sentMessage = await channel.send(combinedMessages);

    // Add reactions to the message
    const REACTIONS = ['📜', '🔵', '🔥'];
    for (const emoji of REACTIONS) {
      await sentMessage.react(emoji);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}