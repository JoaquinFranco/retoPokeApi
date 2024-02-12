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
    let attempts = 0;
    this.listShowed = this.pokemonApiService.pokemonList.filter((element) => {
      return element.name.includes(this.pokemonSearch);
    });

    if (this.listShowed.length > 0) {
      // Se encontraron resultados, puedes manejarlos aquí
      console.log('Resultados encontrados:', this.listShowed);
    } else {
      // No se encontraron resultados, realiza otra petición o ajusta lógica según necesidades
      console.log('No se encontraron resultados. Intento:', attempts + 1);
      attempts++;
      this.search2(attempts);
    }
  }

  search2(attempts: number) {
    if (this.pokemonApiService.nextPokemonsUrl) {
      this.pokemonApiService
        .getPokemons(this.pokemonApiService.nextPokemonsUrl)
        .subscribe((response) => {
          this.listShowed = this.pokemonApiService.pokemonList =
            this.pokemonApiService.pokemonList.concat(response.results);
          this.pokemonApiService.nextPokemonsUrl = response.next;
          this.listShowed = this.pokemonApiService.pokemonList.filter(
            (element) => {
              return element.name.includes(this.pokemonSearch);
            }
          );
          if (this.listShowed.length > 0) {
            // Se encontraron resultados, puedes manejarlos aquí
            console.log('Resultados encontrados:', this.listShowed);
          } else {
            // No se encontraron resultados, realiza otra petición o ajusta lógica según necesidades
            console.log('No se encontraron resultados. Intento:', attempts + 1);
            console.log(
              'Existe next Page:',
              this.pokemonApiService.nextPokemonsUrl
            );
            attempts++;
            this.search2(attempts);
          }
        });
    }
  }

  topScroll() {
    window.scrollTo(0, 0);
  }

  downScroll() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
