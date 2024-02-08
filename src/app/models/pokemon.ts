export interface PokemonList {
  count: number;
  next: string;
  previous?: string;
  results: [PokemonListResults];
}

export interface PokemonListResults {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: [Abilities];
  types: [Types];
  stats: [Stats];
  moves: [Moves];
  sprites: Sprites;
}

interface Abilities {
  ability: {
    name: string;
    url: string;
    effect?: string;
    short_effect?: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Skill {
  effect_entries: [Effect_entries];
}

interface Effect_entries {
  effect: string;
  short_effect: string;
  language: {
    name: string;
  };
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Moves {
  move: {
    name: string;
    url: string;
  };
}

interface Sprites {
  front_default: string;
  other: Other;
}

interface Other {
  home: {
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  'official-artwork': {
    front_default: string;
    front_shiny: string;
  };
}
