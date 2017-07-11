import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { AlbumAddComponent } from './components/album-add.component';

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "mis-datos",component: UserEditComponent},
  {path: "artists/:page",component: ArtistListComponent},
  {path: "new-artist",component: ArtistAddComponent},
  {path: "update-artist/:id",component: ArtistEditComponent},
  {path: "artist/:id",component: ArtistDetailComponent},
  {path: "album-add/:artist",component: AlbumAddComponent},
  {path: "**",component: HomeComponent}

];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
