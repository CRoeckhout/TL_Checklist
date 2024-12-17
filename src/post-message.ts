import { Message, TextChannel } from "discord.js";
import { findDailyMessage } from "./find-daily-messages";
import { getDailyEmojis } from "./helpers/emojis";

export async function postMessage(channel: TextChannel): Promise<Message<boolean> | undefined> {
  try {
    const combinedMessages = await findDailyMessage(channel);
    if (!combinedMessages) return;

    const sentMessage = await channel.send(combinedMessages);

    return sentMessage;
  } catch (error) {
    console.error('Error:', error);
  }
}