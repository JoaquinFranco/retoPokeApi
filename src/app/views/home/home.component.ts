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
  pokemonList: PokemonListResults[] = [];
  nextPokemonsUrl: string = '';

  constructor(
    public pokemonApiService: PokeApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonApiService.getPokemons().subscribe((response) => {
      this.pokemonList = response.results;
      this.nextPokemonsUrl = response.next;
    });
  }

  onScrollDown() {
    this.pokemonApiService
      .getPokemons(this.nextPokemonsUrl)
      .subscribe((response) => {
        this.pokemonList = this.pokemonList.concat(response.results);
        this.nextPokemonsUrl = response.next;
        console.log(this.pokemonList);
      });
  }

  showDetail(pokemon: PokemonListResults) {
    let aux = pokemon.url.split('/');
    let pokemonId = aux[aux.length - 2];
    this.router.navigateByUrl('/detail/' + pokemonId);
  }
}
