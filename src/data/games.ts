export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  commentCount: number;
  fullDetails: string;
  socialSentiment: {
    twitter: string[];
    youtube: string[];
    instagram: string[];
  };
}

export interface Game {
  id: string;
  title: string;
  category: string;
  rank: number;
}

export interface UpcomingGame {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
}

export interface GameDetail {
  id: string;
  title: string;
  category: string;
  size: string;
  description: string;
  detailedDescription: string;
  rating: number;
  isAndroid: boolean;
  isPC: boolean;
  isConsole: boolean;
  releaseDate?: string;
  companyStatement?: string;
  fullDetails: string;
  socialSentiment: {
    twitter: string[];
    youtube: string[];
    instagram: string[];
  };
}

export const NEWS_DATA: NewsItem[] = [
  { 
    id: '1', 
    title: 'BGMI Patch 4.2: New Map & Weapon Balancing', 
    category: 'BGMI', 
    date: 'March 6, 2026', 
    summary: 'The latest update brings a new desert map and major weapon tweaks.', 
    commentCount: 342, 
    fullDetails: 'BGMI Patch 4.2 introduces the "Miramar Oasis" desert map, redesigned weapon recoil for assault rifles, and a new vehicle class. Developers state this aims to balance long-range combat.',
    socialSentiment: {
      twitter: ['Love the new map!', 'Recoil changes are too harsh.'],
      youtube: ['Best update in months!', 'Needs more optimization.'],
      instagram: ['Can\'t wait to play!']
    }
  },
  { 
    id: '2', 
    title: 'GTA VI: Rockstar Confirms Trailer 2 Date', 
    category: 'GTA', 
    date: 'March 6, 2026', 
    summary: 'Trailer 2 is officially dropping next week!', 
    commentCount: 1520, 
    fullDetails: 'Rockstar Games has officially announced that the second trailer for Grand Theft Auto VI will be released next week. Fans are speculating about the new features and the release window.',
    socialSentiment: {
      twitter: ['Finally!', 'Hyped!'],
      youtube: ['GTA VI is going to be legendary.', 'Hope it runs on my PC.'],
      instagram: ['Trailer 2 let\'s go!']
    }
  },
  { 
    id: '3', 
    title: 'Valorant: VCT 2026 Stage 1 Finals Live', 
    category: 'Valorant', 
    date: 'March 6, 2026', 
    summary: 'Catch the intense action of the VCT finals happening right now.', 
    commentCount: 890, 
    fullDetails: 'The VCT 2026 Stage 1 Finals are currently live, featuring the top teams from around the world competing for the championship title.',
    socialSentiment: {
      twitter: ['What a play!', 'Rooting for Sentinels.'],
      youtube: ['Insane aim!', 'Best esport right now.'],
      instagram: ['VCT finals are crazy!']
    }
  },
  { 
    id: '4', 
    title: 'Free Fire x Anime Collab Announced', 
    category: 'Free Fire', 
    date: 'March 6, 2026', 
    summary: 'A massive new collaboration with a top anime series is coming.', 
    commentCount: 560, 
    fullDetails: 'Free Fire has teased a major collaboration with a popular anime series, promising new character skins, weapon designs, and limited-time events.',
    socialSentiment: {
      twitter: ['Which anime?', 'Hope it\'s Naruto.'],
      youtube: ['Free Fire collabs are always fire.', 'Can\'t wait!'],
      instagram: ['Anime skins incoming!']
    }
  },
  { 
    id: '5', 
    title: 'PUBG Global Series: Group Stage Results', 
    category: 'PUBG', 
    date: 'March 6, 2026', 
    summary: 'The group stage concludes with surprising upsets.', 
    commentCount: 210, 
    fullDetails: 'The PUBG Global Series group stage has concluded, with several top-tier teams failing to qualify, leading to unexpected results.',
    socialSentiment: {
      twitter: ['What an upset!', 'My favorite team is out.'],
      youtube: ['PUBG esports is so unpredictable.', 'Great matches.'],
      instagram: ['Group stage was wild!']
    }
  },
  { 
    id: '6', 
    title: 'Warzone Season 3: New Operators Revealed', 
    category: 'Call of Duty', 
    date: 'March 6, 2026', 
    summary: 'Get a first look at the new operators coming to Warzone.', 
    commentCount: 430, 
    fullDetails: 'Call of Duty: Warzone Season 3 introduces new operators with unique backstories and tactical abilities, expanding the game\'s narrative and gameplay.',
    socialSentiment: {
      twitter: ['New operators look cool.', 'Warzone needs better anti-cheat.'],
      youtube: ['Season 3 looks promising.', 'Hope the meta shifts.'],
      instagram: ['New skins!']
    }
  },
  { 
    id: '7', 
    title: 'Minecraft 1.22: Deep Dark Expansion', 
    category: 'Minecraft', 
    date: 'March 6, 2026', 
    summary: 'New biomes and mechanics added in the latest snapshot.', 
    commentCount: 670, 
    fullDetails: 'Minecraft 1.22, the "Deep Dark Expansion," adds new biomes, mobs, and mechanics to the game, focusing on exploration and survival in the deep underground.',
    socialSentiment: {
      twitter: ['Minecraft is still the best.', 'Deep Dark is scary!'],
      youtube: ['Love the new biomes.', 'Mojang did it again.'],
      instagram: ['Minecraft update!']
    }
  },
  { 
    id: '8', 
    title: 'Ananta: New Story Chapter Released', 
    category: 'Ananta', 
    date: 'March 6, 2026', 
    summary: 'Dive into the new story chapter available now.', 
    commentCount: 150, 
    fullDetails: 'Ananta\'s latest story chapter continues the epic journey, introducing new characters and uncovering more secrets of the mysterious world.',
    socialSentiment: {
      twitter: ['Ananta story is so good.', 'Need more chapters.'],
      youtube: ['Ananta is underrated.', 'Beautiful art style.'],
      instagram: ['New Ananta chapter!']
    }
  },
];

export const TRENDING_GAMES: Game[] = [
  { id: '1', title: 'GTA VI', category: 'Open World', rank: 1 },
  { id: '2', title: 'Valorant', category: 'FPS', rank: 2 },
  { id: '3', title: 'BGMI', category: 'Battle Royale', rank: 3 },
  { id: '4', title: 'Minecraft', category: 'Sandbox', rank: 4 },
  { id: '5', title: 'Elden Ring', category: 'Adventure', rank: 5 },
];

export const POPULAR_THIS_WEEK: GameDetail[] = [
  { id: 'p1', title: 'GTA VI', category: 'Open World', size: '200GB', description: 'Most anticipated game.', detailedDescription: 'Grand Theft Auto VI returns to the state of Leonida, home to the neon-soaked streets of Vice City and beyond, in the biggest, most immersive evolution of the Grand Theft Auto series yet.', rating: 5.0, isAndroid: false, isPC: true, isConsole: true, fullDetails: 'GTA VI is the most anticipated game of the decade. Rockstar has promised a massive open world with unprecedented detail and interactivity.', socialSentiment: { twitter: ['Can\'t wait!', 'GTA VI is going to be huge.'], youtube: ['Rockstar never disappoints.', 'Hope it runs on my PC.'], instagram: ['GTA VI hype!'] }, releaseDate: 'TBA' },
  { id: 'p2', title: 'Valorant', category: 'FPS', size: '30GB', description: 'Top tactical shooter.', detailedDescription: 'Valorant is a character-based 5v5 tactical shooter set on a near-future Earth. Master unique abilities and precise gunplay to outsmart your opponents.', rating: 4.7, isAndroid: false, isPC: true, isConsole: false, fullDetails: 'Valorant continues to dominate the tactical shooter scene with its unique blend of agent abilities and precise gunplay.', socialSentiment: { twitter: ['Valorant is life.', 'Ranked is so toxic.'], youtube: ['Best tactical shooter.', 'Insane plays.'], instagram: ['Valorant clips!'] }, releaseDate: 'Available Now' },
  { id: 'p3', title: 'BGMI', category: 'Battle Royale', size: '4GB', description: 'Most played mobile BR.', detailedDescription: 'Battlegrounds Mobile India is a battle royale game where multiple players create strategies to be the last one standing on the battlegrounds.', rating: 4.6, isAndroid: true, isPC: false, isConsole: false, fullDetails: 'BGMI remains the most popular mobile battle royale in India, with constant updates and a thriving esports scene.', socialSentiment: { twitter: ['BGMI is love.', 'Need better anti-cheat.'], youtube: ['BGMI tournaments are intense.', 'Best mobile game.'], instagram: ['BGMI highlights!'] }, releaseDate: 'Available Now' },
  { id: 'p4', title: 'Minecraft', category: 'Sandbox', size: '1GB', description: 'Timeless classic.', detailedDescription: 'Minecraft is a sandbox game where players explore a blocky, procedurally-generated 3D world, and may discover and extract raw materials, craft tools and items, and build structures or earthworks.', rating: 4.8, isAndroid: true, isPC: true, isConsole: true, fullDetails: 'Minecraft continues to be a timeless classic, with endless possibilities for creativity and exploration.', socialSentiment: { twitter: ['Minecraft is the best.', 'Building a massive castle.'], youtube: ['Minecraft is so relaxing.', 'Mojang is doing great.'], instagram: ['Minecraft builds!'] }, releaseDate: 'Available Now' },
  { id: 'p5', title: 'Elden Ring', category: 'Adventure', size: '50GB', description: 'Masterpiece adventure.', detailedDescription: 'Elden Ring is an action role-playing game set in the Lands Between. Players embark on a journey to become the Elden Lord and wield the power of the Elden Ring.', rating: 4.9, isAndroid: false, isPC: true, isConsole: true, fullDetails: 'Elden Ring is a masterpiece adventure, challenging players with its deep lore, difficult bosses, and expansive world.', socialSentiment: { twitter: ['Elden Ring is so hard.', 'Best game ever.'], youtube: ['Elden Ring lore is deep.', 'Boss fights are epic.'], instagram: ['Elden Ring screenshots!'] }, releaseDate: 'Available Now' },
];

export const FEATURED_GAMES: GameDetail[] = [
  { 
    id: 'f1', 
    title: 'Ananta', 
    category: 'Adventure', 
    size: '15GB', 
    description: 'An immersive adventure in a mysterious world.', 
    detailedDescription: 'Ananta is an immersive adventure game that takes players on a journey through a mysterious and beautifully crafted world, filled with secrets and challenges.',
    rating: 4.8, 
    isAndroid: false,
    isPC: true,
    isConsole: false,
    releaseDate: 'Available Now', 
    companyStatement: 'We are thrilled to bring Ananta to players worldwide, offering a unique blend of storytelling and exploration.',
    fullDetails: 'Ananta is an immersive adventure game that takes players on a journey through a mysterious and beautifully crafted world, filled with secrets and challenges. Developers have focused on a unique blend of storytelling and exploration.',
    socialSentiment: { twitter: ['Ananta is so beautiful.', 'Story is deep.'], youtube: ['Ananta is underrated.', 'Art style is amazing.'], instagram: ['Ananta screenshots!'] }
  },
  { 
    id: 'f2', 
    title: 'Neverness to Everness', 
    category: 'Open World RPG', 
    size: '50GB', 
    description: 'A stunning open-world RPG with supernatural elements.', 
    detailedDescription: 'Neverness to Everness is a stunning open-world RPG that combines supernatural elements with deep storytelling and exploration in a meticulously designed world.',
    rating: 4.9, 
    isAndroid: true,
    isPC: true,
    isConsole: false,
    releaseDate: 'Coming Q3 2026', 
    companyStatement: 'Neverness to Everness is our most ambitious project yet, pushing the boundaries of open-world design.',
    fullDetails: 'Neverness to Everness is a stunning open-world RPG that combines supernatural elements with deep storytelling and exploration in a meticulously designed world. Developers are pushing the boundaries of open-world design.',
    socialSentiment: { twitter: ['Neverness to Everness looks amazing.', 'Can\'t wait for Q3.'], youtube: ['This game looks next-gen.', 'Supernatural elements are cool.'], instagram: ['Neverness to Everness hype!'] }
  },
];

export const UPCOMING_GAMES: UpcomingGame[] = [
  { id: 'u1', title: 'The Witcher 4', releaseDate: 'TBA 2026', description: 'The next chapter in the legendary Witcher saga.' },
  { id: 'u2', title: 'Hollow Knight: Silksong', releaseDate: 'June 2026', description: 'Explore a vast, haunted kingdom in this highly anticipated sequel.' },
  { id: 'u3', title: 'Death Stranding 2', releaseDate: 'Late 2026', description: 'Continue the journey in a world transformed by the Death Stranding.' },
];

export const CATEGORIZED_GAMES: Record<string, GameDetail[]> = {
  'Open World Games': [
    { id: 'ow1', title: 'GTA VI', category: 'Open World', size: '200GB', description: 'The most anticipated open world game ever.', detailedDescription: 'Grand Theft Auto VI returns to the state of Leonida, home to the neon-soaked streets of Vice City and beyond.', rating: 5.0, isAndroid: false, isPC: true, isConsole: true, fullDetails: 'GTA VI is the most anticipated game of the decade. Rockstar has promised a massive open world with unprecedented detail and interactivity.', socialSentiment: { twitter: ['Can\'t wait!', 'GTA VI is going to be huge.'], youtube: ['Rockstar never disappoints.', 'Hope it runs on my PC.'], instagram: ['GTA VI hype!'] }, releaseDate: 'TBA' },
    { id: 'ow2', title: 'The Witcher 4', category: 'Open World', size: '150GB', description: 'A massive fantasy open world.', detailedDescription: 'The Witcher 4 continues the epic saga in a vast, open-world fantasy setting.', rating: 4.9, isAndroid: false, isPC: true, isConsole: true, fullDetails: 'The Witcher 4 continues the epic saga in a vast, open-world fantasy setting, with improved combat and storytelling.', socialSentiment: { twitter: ['Witcher 4 is going to be epic.', 'Can\'t wait to play as Geralt again.'], youtube: ['Witcher 4 is the best.', 'Combat looks improved.'], instagram: ['Witcher 4 hype!'] }, releaseDate: 'TBA' },
    { id: 'ow3', title: 'Elden Ring', category: 'Open World', size: '50GB', description: 'A challenging open world adventure.', detailedDescription: 'Elden Ring is an action role-playing game set in the Lands Between.', rating: 4.8, isAndroid: false, isPC: true, isConsole: true, fullDetails: 'Elden Ring is an action role-playing game set in the Lands Between. Players embark on a journey to become the Elden Lord and wield the power of the Elden Ring.', socialSentiment: { twitter: ['Elden Ring is so hard.', 'Best game ever.'], youtube: ['Elden Ring lore is deep.', 'Boss fights are epic.'], instagram: ['Elden Ring screenshots!'] }, releaseDate: 'Available Now' },
  ],
  'FPS Games': [
    { id: 'fps1', title: 'Valorant', category: 'FPS', size: '30GB', description: 'Tactical 5v5 shooter.', detailedDescription: 'Valorant is a character-based 5v5 tactical shooter set on a near-future Earth.', rating: 4.7, isAndroid: false, isPC: true, isConsole: false, fullDetails: 'Valorant continues to dominate the tactical shooter scene with its unique blend of agent abilities and precise gunplay.', socialSentiment: { twitter: ['Valorant is life.', 'Ranked is so toxic.'], youtube: ['Best tactical shooter.', 'Insane plays.'], instagram: ['Valorant clips!'] }, releaseDate: 'Available Now' },
    { id: 'fps2', title: 'Call of Duty: Warzone', category: 'FPS', size: '100GB', description: 'Fast-paced battle royale shooter.', detailedDescription: 'Call of Duty: Warzone is a massive free-to-play combat arena.', rating: 4.5, isAndroid: false, isPC: true, isConsole: true, fullDetails: 'Call of Duty: Warzone is a massive free-to-play combat arena, with constant updates and a thriving esports scene.', socialSentiment: { twitter: ['Warzone is so fun.', 'Need better anti-cheat.'], youtube: ['Warzone is the best.', 'New operators are cool.'], instagram: ['Warzone clips!'] }, releaseDate: 'Available Now' },
  ],
  'Battle Royale Games': [
    { id: 'br1', title: 'BGMI', category: 'Battle Royale', size: '4GB', description: 'The ultimate mobile battle royale.', detailedDescription: 'Battlegrounds Mobile India is a battle royale game.', rating: 4.6, isAndroid: true, isPC: false, isConsole: false, fullDetails: 'BGMI remains the most popular mobile battle royale in India, with constant updates and a thriving esports scene.', socialSentiment: { twitter: ['BGMI is love.', 'Need better anti-cheat.'], youtube: ['BGMI tournaments are intense.', 'Best mobile game.'], instagram: ['BGMI highlights!'] }, releaseDate: 'Available Now' },
    { id: 'br2', title: 'Free Fire', category: 'Battle Royale', size: '2GB', description: 'Fast-paced battle royale.', detailedDescription: 'Free Fire is a fast-paced battle royale game.', rating: 4.4, isAndroid: true, isPC: false, isConsole: false, fullDetails: 'Free Fire is a fast-paced battle royale game, with constant updates and a thriving esports scene.', socialSentiment: { twitter: ['Free Fire is so fun.', 'Need better graphics.'], youtube: ['Free Fire is the best.', 'New skins are cool.'], instagram: ['Free Fire highlights!'] }, releaseDate: 'Available Now' },
    { id: 'br3', title: 'PUBG', category: 'Battle Royale', size: '5GB', description: 'The classic battle royale.', detailedDescription: 'PUBG is the classic battle royale experience.', rating: 4.5, isAndroid: true, isPC: true, isConsole: true, fullDetails: 'PUBG is the classic battle royale experience, with constant updates and a thriving esports scene.', socialSentiment: { twitter: ['PUBG is the best.', 'Need better anti-cheat.'], youtube: ['PUBG is so fun.', 'New maps are cool.'], instagram: ['PUBG highlights!'] }, releaseDate: 'Available Now' },
  ],
  'Anime & Adventure Games': [
    { id: 'an1', title: 'Genshin Impact', category: 'Adventure', size: '20GB', description: 'Open world anime adventure.', detailedDescription: 'Genshin Impact is an open-world action RPG.', rating: 4.7, isAndroid: true, isPC: true, isConsole: true, fullDetails: 'Genshin Impact is an open-world action RPG, with constant updates and a thriving community.', socialSentiment: { twitter: ['Genshin is so beautiful.', 'Need more primogems.'], youtube: ['Genshin is the best.', 'New characters are cool.'], instagram: ['Genshin screenshots!'] }, releaseDate: 'Available Now' },
    { id: 'an2', title: 'Honkai: Star Rail', category: 'Adventure', size: '15GB', description: 'Turn-based space fantasy.', detailedDescription: 'Honkai: Star Rail is a turn-based space fantasy RPG.', rating: 4.8, isAndroid: true, isPC: true, isConsole: true, fullDetails: 'Honkai: Star Rail is a turn-based space fantasy RPG, with constant updates and a thriving community.', socialSentiment: { twitter: ['Honkai: Star Rail is so fun.', 'Need more stellar jades.'], youtube: ['Honkai: Star Rail is the best.', 'New characters are cool.'], instagram: ['Honkai: Star Rail screenshots!'] }, releaseDate: 'Available Now' },
  ],
};
