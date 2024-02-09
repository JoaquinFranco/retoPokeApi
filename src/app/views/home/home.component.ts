import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonListResults } from '../../models/pokemon';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pokemonSearch: string = '';
  listShowed: PokemonListResults[] = [];
  constructor(
    public pokemonApiService: PokeApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (this.pokemonApiService.pokemonList.length === 0) {
      this.pokemonApiService.getPokemons().subscribe((response) => {
        this.listShowed = this.pokemonApiService.pokemonList = response.results;
        this.pokemonApiService.nextPokemonsUrl = response.next;
      });
    }
    if (this.listShowed.length === 0) {
      this.listShowed = this.pokemonApiService.pokemonList;
    }
  }

  onScrollDown() {
    if (this.pokemonApiService.nextPokemonsUrl) {
      this.pokemonApiService
        .getPokemons(this.pokemonApiService.nextPokemonsUrl)
        .subscribe((response) => {
          this.listShowed = this.pokemonApiService.pokemonList =
            this.pokemonApiService.pokemonList.concat(response.results);
          this.pokemonApiService.nextPokemonsUrl = response.next;
        });
    }
  }

  showDetail(pokemon: PokemonListResults) {
    let aux = pokemon.url.split('/');
    let pokemonId = aux[aux.length - 2];
    this.router.navigateByUrl('/detail/' + pokemonId);
  }

  search() {
    this.listShowed = this.pokemonApiService.pokemonList.filter((element) => {
      return element.name.includes(this.pokemonSearch);
    });
  }

  topScroll() {
    window.scrollTo(0, 0);
  }

  downScroll() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
