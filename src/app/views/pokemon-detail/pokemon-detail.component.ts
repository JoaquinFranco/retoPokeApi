import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent implements OnInit {
  pokemon!: Pokemon;
  url: string = '';
  pokemonId!: number;
  frontalImage!: string;

  constructor(
    public pokeApiService: PokeApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.getIdFromUrl();
  }

  getIdFromUrl() {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.pokemonId = parseInt(parametros.get('id')!);
      this.getPokemonData();
    });
  }

  getPokemonData() {
    this.pokeApiService.getPokemon(this.pokemonId).subscribe((response) => {
      this.pokemon = response;
      this.frontalImage =
        this.pokemon.sprites.other['official-artwork'].front_default;
      this.getSkillsData();
      console.log(this.pokemon);
    });
  }

  getSkillsData() {
    this.pokemon.abilities.forEach((skill) => {
      this.pokeApiService
        .getSkillData(skill.ability.url)
        .subscribe((response) => {
          console.log(response);
          response.effect_entries.find((entry) => {
            if (entry.language.name === 'en') {
              skill.ability.effect = entry.effect;
              skill.ability.short_effect = entry.short_effect;
            }
          });
        });
    });
  }

  return() {
    this.router.navigateByUrl('/home');
  }
}
