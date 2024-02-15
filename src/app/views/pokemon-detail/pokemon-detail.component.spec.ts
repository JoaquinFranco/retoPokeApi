import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import mocks from '../../../assets/mocks.json';
import { PokemonDetailComponent } from './pokemon-detail.component';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  const mockPokemon = mocks.pokemonJson;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, RouterModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PokemonDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test getIdFromUrl', () => {
    spyOn(component.pokeApiService, 'getPokemon').and.returnValue(
      of(<any>mockPokemon.pokemon)
    );
    component.getIdFromUrl();
    expect(component.pokemon).toBeDefined();
  });

  it('test getPokemonData', () => {
    component.pokemon = <any>mockPokemon.pokemon;
    let call = spyOn(component, 'getSkillsData');
    component.getPokemonData();
    expect(call).toHaveBeenCalled();
  });

  it('test getPointEffort', () => {
    component.pokemon = <any>mockPokemon.pokemon;
    component['getPointEffort']();
    expect(component.textEffortShowed.length).toEqual(2);
  });

  it('test getSkillsData', () => {
    component.pokemon = <any>mockPokemon.pokemon;
    spyOn(component.pokeApiService, 'getSkillData').and.returnValue(
      of(<any>mockPokemon.skill)
    );
    component.getSkillsData();
    expect(component.pokemon.abilities[0].ability.effect).toBeDefined();
  });

  it('test return', () => {
    let call = spyOn(component.router, 'navigateByUrl');
    component.return();
    expect(call).toHaveBeenCalled();
  });
});
