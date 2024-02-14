import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokeApiService } from './poke-api.service';

describe('PokeApiService', () => {
  let service: PokeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeApiService],
    }),
      (service = TestBed.inject(PokeApiService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test getPokemons: ', () => {
    it('- without url', () => {
      service.getPokemons().subscribe((response) => {
        expect(response.results.length).toBeGreaterThan(0);
      });
    });
    it('- with url', () => {
      service
        .getPokemons('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
        .subscribe((response) => {
          expect(response.results.length).toBeGreaterThan(0);
        });
    });
  });

  it('test getPokemon: ', () => {
    service.getPokemon(1).subscribe((response) => {
      expect(response.name).toEqual('bulbasaur');
    });
  });

  it('test getSkillData: ', () => {
    service
      .getSkillData('https://pokeapi.co/api/v2/ability/65/')
      .subscribe((response) => {
        expect(response.effect_entries.length).toBeGreaterThan(0);
      });
  });
});
