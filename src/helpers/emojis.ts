import { Collection, Guild, GuildEmoji } from "discord.js";

export enum CustomEmojis {
  eggs = "eggs",
  honey = "honey",
  rye = "rye",
  contract_scroll = "contract_scroll",
  contract_scroll_group = "contract_scroll_group",
  mysticKey = "mystic_key",
  preciousPouch = "precious_pouch",
  extractStone = "extract_stone",
  manaPot = "mana_pot",
  healtPot = "health_pot",
  traitStone = "trait_stone",
  twoStarDungeon = "2star_dungeon",
  oneStartDungeon = "1star_dungeon"
}

export const dailyEmojis: { type: string, emojis: string[] }[] = [
  {
    type: 'general',
    emojis: [
      CustomEmojis.eggs,
      CustomEmojis.rye,
      CustomEmojis.honey,
    ]
  },
  {
    type: 'contract',
    emojis: [
      CustomEmojis.mysticKey,
      CustomEmojis.preciousPouch
    ]
  },
  {
    type: 'guild',
    emojis: [
      CustomEmojis.manaPot,
      CustomEmojis.healtPot
    ]
  },
  {
    type: 'dungeon',
    emojis: [
      CustomEmojis.oneStartDungeon,
      CustomEmojis.twoStarDungeon
    ]
  }
]

export const weeklyEmojis: { type: string, emojis: string[] }[] = [
  {
    type: 'general',
    emojis: [
      CustomEmojis.contract_scroll,
      CustomEmojis.contract_scroll_group,
    ]
  },
  {
    type: 'contract',
    emojis: [
      CustomEmojis.extractStone
    ]
  },
  {
    type: 'guild',
    emojis: [
      CustomEmojis.traitStone,
    ]
  }
]

export function getDailyEmojis(guild: Guild): (GuildEmoji | undefined)[] {
  return dailyEmojis
    .map(category => category.emojis)
    .flat()
    .map(emoji => guild.emojis.cache.find(e => emoji == e.name!));
}

export function getWeeklyEmojis(guild: Guild): (GuildEmoji | undefined)[] {
  return dailyEmojis
    .map(category => category.emojis)
    .flat()
    .map(emoji => guild.emojis.cache.find(e => emoji == e.name!));
}