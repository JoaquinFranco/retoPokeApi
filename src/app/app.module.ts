import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { PokeApiService } from './services/poke-api.service';
import { NgxTranslateModule } from './translate/translate.module';
import { HomeComponent } from './views/home/home.component';
import { PokemonDetailComponent } from './views/pokemon-detail/pokemon-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxTranslateModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AppComponent, HomeComponent, PokemonDetailComponent],
  bootstrap: [AppComponent],
  providers: [PokeApiService, provideAnimationsAsync()],
})
export class AppModule {}
