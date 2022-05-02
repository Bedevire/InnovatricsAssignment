import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistRegistrationComponent } from './watchlist-registration/watchlist-registration.component';
import { WatchlistSearchComponent } from './watchlist-search/watchlist-search.component';
import { MembersComponent } from './members/members.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'resitration-route', component: WatchlistRegistrationComponent},
  {path: 'search-route', component: WatchlistSearchComponent},
  {path: 'debug-route', component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
