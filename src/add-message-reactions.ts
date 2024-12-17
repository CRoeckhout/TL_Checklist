import { Guild, Message } from "discord.js";
import { getDailyEmojis, getWeeklyEmojis } from "./helpers/emojis";

export async function addMessageReactions(message: Message, guild: Guild, type: 'weekly' | 'daily') {
  const emojis = type === 'daily' ? getDailyEmojis(guild) : getWeeklyEmojis(guild);

  for (const emoji of emojis) {
    if (emoji) await message.react(emoji);
  }
}