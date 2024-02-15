import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import pokemonJson from '../../../assets/mocks.json';
import { PokemonList } from '../../models/pokemon';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const mockPokemon = pokemonJson.pokemonJson;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterModule,
        TranslateTestingModule.withTranslations({}),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit: ', () => {
    spyOn(component.pokemonApiService, 'getPokemons').and.returnValue(
      of(<PokemonList>mockPokemon.pokemonList)
    );
    component.ngOnInit();
    expect(component.listShowed.length).toBeGreaterThan(0);
  });

  it('test changeSiteLanguage: ', () => {
    component.changeSiteLanguage('es');
    expect(component.pokemonApiService.siteLanguage).toEqual('Español');
  });

  it('test onScrollDown: ', () => {
    component.pokemonApiService.nextPokemonsUrl =
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';
    spyOn(component.pokemonApiService, 'getPokemons').and.returnValue(
      of(<PokemonList>mockPokemon.pokemonList)
    );
    component.onScrollDown();
    expect(component.listShowed.length).toBeGreaterThan(0);
  });

  it('test showDetail: ', () => {
    let pokemon = mockPokemon.PokemonListResult;
    let call = spyOn(component.router, 'navigateByUrl');
    component.showDetail(pokemon);
    expect(call).toHaveBeenCalled();
  });

  describe('test search: ', () => {
    it('- pokemon finded: ', () => {
      let call = spyOn(component, 'search2').and.callFake(() => {});
      component.pokemonSearch = 'bulb';
      component.pokemonApiService.pokemonList = mockPokemon.pokemonList.results;
      component.search();
      expect(component.listShowed.length).toEqual(1);
      expect(call).not.toHaveBeenCalled();
    });
    it('- pokemon not finded: ', () => {
      let call = spyOn(component, 'search2').and.callFake(() => {});
      component.pokemonSearch = 'pika';
      component.pokemonApiService.pokemonList = mockPokemon.pokemonList.results;
      component.search();
      expect(component.listShowed.length).toEqual(0);
      expect(call).toHaveBeenCalled();
    });
  });

  it('test search2: ', () => {
    component.pokemonApiService.nextPokemonsUrl =
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';
    component.pokemonSearch = 'pika';
    let list = mockPokemon.pokemonList;
    list.next = <any>undefined;
    spyOn(component.pokemonApiService, 'getPokemons').and.returnValue(
      of(<PokemonList>list)
    );
    component.search2(0);
    expect(component.listShowed.length).toEqual(0);
  });

  it('test topScroll: ', () => {
    let call = spyOn(window, 'scrollTo');
    component.topScroll();
    expect(call).toHaveBeenCalled();
  });

  it('test downScroll: ', () => {
    let call = spyOn(window, 'scrollTo');
    component.downScroll();
    expect(call).toHaveBeenCalled();
  });
});
