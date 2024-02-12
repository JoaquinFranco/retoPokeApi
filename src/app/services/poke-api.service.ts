import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Pokemon,
  PokemonList,
  PokemonListResults,
  Skill,
} from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  pokemonList: PokemonListResults[] = [];
  nextPokemonsUrl: string = '';
  siteLanguage = 'English';
  private pokemonRoot: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(public http: HttpClient) {}

  getPokemons(url?: string): Observable<PokemonList> {
    let link = `${this.pokemonRoot}?offset=0&limit=20`;
    if (url) {
      link = url;
    }
    return this.http.get<PokemonList>(link);
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokemonRoot}/${id}`);
  }

  getSkillData(url: string): Observable<Skill> {
    return this.http.get<Skill>(`${url}`);
  }
}
