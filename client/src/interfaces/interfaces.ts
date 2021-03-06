export interface AbilityListItem {
  ability: object;
  slot: number;
}
export interface Pokemon {
  abilities: AbilityListItem[];
  name: string;
  sprites: any;
}
export interface PokemonListItem {
  name: string;
  url: string;
}
