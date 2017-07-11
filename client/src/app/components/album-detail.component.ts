import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'album-detail',
  templateUrl: '../views/album-detail.html',
  providers: [UserService,ArtistService,AlbumService]
})

export class AlbumDetailComponent implements OnInit{
  public titulo: string;
  public album: Album;
  public songs: Song[];
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public id;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _artistService: ArtistService,
  private _albumService: AlbumService
  ){

    this.titulo = 'Artist detail';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
}
  ngOnInit(){
    //console.log('artist-list.component cargado');
    //conseguir el listado de artistas
    this.getAlbum();
    //this.getSongs();
  }


getAlbum(){
    this._route.params.forEach((params:Params)=>{
      this.id= params['id'];
      this._albumService.getAlbum(this.token,this.id).subscribe(
        response => {

          if(!response.album){
            this._router.navigate(['/']);
          }else {
            this.album = response.album;

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

  getSongs(){



  }

  public confirmado;
  onDeleteConfirm(id){
    this.confirmado=id;
  }
  onCancelSong(){
    this.confirmado=null;
  }
  onDeleteSong(id){

  }

}

