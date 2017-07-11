import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AlbumService} from '../services/album.service';
import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'artist-detail',
  templateUrl: '../views/artist-detail.html',
  providers: [UserService,ArtistService,AlbumService]
})

export class ArtistDetailComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
  public albums: Album[];
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
    this.getArtist();
    this.getAlbums();
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

  getAlbums(){

      this._albumService.getAlbums(this.token,this.id).subscribe(
                response => {

          if(!response.albums){
            this._router.navigate(['/']);
          }else {
            this.albums = response.albums;
            console.log(this.albums);
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

  public confirmado;
  onDeleteConfirm(id){
    this.confirmado=id;
  }
  onCancelAlbum(){
    this.confirmado=null;
  }
  onDeleteAlbum(id){
    this._albumService.deleteAlbum(this.token,id).subscribe(
      response => {

          if(!response.albumDeleted){
            this.errorMessage = 'Error en server';
          }else {
            this.getAlbums();
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

