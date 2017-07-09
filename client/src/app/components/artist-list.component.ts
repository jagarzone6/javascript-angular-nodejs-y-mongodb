import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'artist-list',
  templateUrl: '../views/artist-list.html',
  providers: [UserService,ArtistService]
})

export class ArtistListComponent implements OnInit{
  public titulo: string;
  public artists: Artist[];
  public identity;
  public token;
  public url:string;
  public page;
  public next_page=1;
  public prev_page=1;
  public errorMessage;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _artistService: ArtistService
  ){

    this.titulo = 'Artists';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
}
  ngOnInit(){
    //console.log('artist-list.component cargado');
    //conseguir el listado de artistas
    this.getArtists();
    
  }


  getArtists(){
    this._route.params.forEach((params:Params)=>{
      this.page = +params['page'];
      if(!this.page){
        this.page = 1;
      } else{
        this.next_page = this.page +1;
        if(this.page >= 2){
          this.prev_page = this.page -1;
        }else{
          this.prev_page = 1;
        }
      }

      this._artistService.getArtists(this.token,this.page).subscribe(
                response => {

          if(!response.artists){
            this._router.navigate(['/']);
          }else {
            this.artists = response.artists;
            console.log(this.artists);
          }

        },
        error => {

          var errorMessage = <any>error;
          if (this.errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.errorMessage = body.message;
          }

        }

      );
    });

  }
public confirmado;
  onDeleteConfirm(id){
    this.confirmado=id;
  }
  onCancelArtist(){
    this.confirmado=null;
  }
  onDeleteArtist(id){
    this._artistService.deleteArtist(this.token,id).subscribe(
      response => {

          if(!response.artistDeleted){
            this.errorMessage = 'Error en server';
          }else {
            this.getArtists();
          }

        },
        error => {

          var errorMessage = <any>error;
          if (this.errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.errorMessage = body.message;
          }

        }

    );
  }
}

