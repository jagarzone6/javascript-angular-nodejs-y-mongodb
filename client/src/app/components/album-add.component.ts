import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';
import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {GLOBAL} from '../services/global';
import {UploadImageService} from '../services/upload-image.service';

@Component({
  selector: 'album-add',
  templateUrl: '../views/album-add.html',
  providers: [UserService,AlbumService,UploadImageService]
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
    private _albumService: AlbumService,
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

onSubmit(){
  this._albumService.addAlbum(this.token,this.album).subscribe(
      response => {

        if(!response.Album){
          alert('Error at Server')
        }else{
          this.album = response.Album;
          this.alertSuccess = 'Album Created';
          //this._router.navigate(['/update-album',response.album._id]);
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      }
    );
}
 


}
