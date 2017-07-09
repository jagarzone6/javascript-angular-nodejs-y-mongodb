import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'artist-detail',
  templateUrl: '../views/artist-detail.html',
  providers: [UserService,ArtistService]
})

export class ArtistDetailComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public id;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _artistService: ArtistService
  ){

    this.titulo = 'Artist detail';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
}
  ngOnInit(){
    //console.log('artist-list.component cargado');
    //conseguir el listado de artistas
    this.getArtist();
  }


getArtist(){
    this._route.params.forEach((params:Params)=>{
      this.id= params['id'];
      this._artistService.getArtist(this.token,this.id).subscribe(
        response => {

          if(!response.artist){
            this._router.navigate(['/']);
          }else {
            this.artist = response.artist;

            //Get Artist Albums
            
          }

        },
        error => {

          var errorMessage = <any>error;
          if (this.errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.errorMessage = body.message;
          }

        }
      )
    });

  }

}

