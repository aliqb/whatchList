import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie/movie.component';
import { WatchListComponent } from './watch-list/watch-list.component';

const routes: Routes = [
  {path:"",redirectTo:'movies',pathMatch:'full'},
  {path:"movies",component:MovieListComponent},
  {path:"movies/:id",component:MovieDetailComponent},
  {path:"watchList",component:WatchListComponent,canActivate:[AuthGuard]},
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
