import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { WatchlistRegistrationComponent } from './watchlist-registration/watchlist-registration.component';
import { WatchlistSearchComponent } from './watchlist-search/watchlist-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    WatchlistRegistrationComponent,
    WatchlistSearchComponent
  ],
  imports: [
    FormsModule,
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
