import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';

const appRoutes: Routes = [
  {path: "", component: UserEditComponent},
  {path: "mis-datos",component: UserEditComponent},
  {path: "artists",component: ArtistListComponent},
  {path: "**",component: UserEditComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
