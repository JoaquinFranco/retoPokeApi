import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
  frontalImageShiny!: string;
  frontalImageHome!: string;
  frontalImageShinyHome!: string;
  frontalImageFemHome!: string;
  frontalImageShinyFemHome!: string;
  isShiny: boolean = false;
  isHomeDesign: boolean = false;
  genderSwitch: boolean = false;
  pointEffortObtained!: {
    name: string;
    value: number;
  };
  textEffortShowed!: [string];

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
    this.activatedRoute.paramMap
      .pipe(
        switchMap((parametros: ParamMap) => {
          this.pokemonId = parseInt(parametros.get('id')!);
          return this.pokeApiService.getPokemon(this.pokemonId);
        })
      )
      .subscribe((response) => {
        this.pokemon = response;
        this.getPokemonData();
      });
  }

  getPokemonData() {
    this.getSprites();
    this.getPointEffort();
    this.getSkillsData();
  }

  private getPointEffort() {
    this.pokemon.stats.forEach((stat) => {
      if (stat.effort > 0) {
        this.pointEffortObtained = {
          name: stat.stat.name,
          value: stat.effort,
        };
        if (!this.textEffortShowed) {
          this.textEffortShowed = [
            this.pointEffortObtained.name +
              ' - ' +
              this.pointEffortObtained.value,
          ];
        } else {
          this.textEffortShowed.push(
            this.pointEffortObtained.name +
              ' - ' +
              this.pointEffortObtained.value
          );
        }
      }
    });
  }

  private getSprites() {
    const { 'official-artwork': artwork, home } = this.pokemon.sprites.other;
    this.frontalImage = artwork.front_default;
    this.frontalImageShiny = artwork.front_shiny;
    this.frontalImageHome = home.front_default;
    this.frontalImageShinyHome = home.front_shiny;
    this.frontalImageFemHome = home.front_female;
    this.frontalImageShinyFemHome = home.front_shiny_female;
  }

  getSkillsData() {
    this.pokemon.abilities.forEach((skill) => {
      this.pokeApiService
        .getSkillData(skill.ability.url)
        .subscribe((response) => {
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
