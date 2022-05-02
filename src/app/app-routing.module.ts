import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistRegistrationComponent } from './watchlist-registration/watchlist-registration.component';
import { WatchlistSearchComponent } from './watchlist-search/watchlist-search.component';
import { MembersComponent } from './members/members.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '*', component: AppComponent},
  {path: 'resitration', component: WatchlistRegistrationComponent},
  {path: 'search', component: WatchlistSearchComponent},
  {path: 'debug', component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
