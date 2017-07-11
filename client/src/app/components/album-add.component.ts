import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {GLOBAL} from '../services/global';
import {UploadImageService} from '../services/upload-image.service';

@Component({
  selector: 'album-add',
  templateUrl: '../views/album-add.html',
  providers: [UserService,ArtistService,UploadImageService]
})

export class AlbumAddComponent implements OnInit{
  public titulo: string;
  public album : Album;
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public alertSuccess;
  public id;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadImageService: UploadImageService
  ){

    this.titulo = 'Add Album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('','',2017,'',_route.snapshot.params['artist']);
}
  ngOnInit(){
    //conseguir el listado de artistas
    //Get artist by ID.
    console.log(this.album);
  }

 


}
