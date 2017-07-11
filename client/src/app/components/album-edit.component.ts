import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';
import {GLOBAL} from '../services/global';
import {UploadImageService} from '../services/upload-image.service';

@Component({
  selector: 'album-edit',
  templateUrl: '../views/album-edit.html',
  providers: [UserService,AlbumService,UploadImageService]
})

export class AlbumEditComponent implements OnInit{
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public alertSuccess;
  public is_edited;
  public id;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
    private _albumService: AlbumService,
    private _uploadImageService: UploadImageService
  ){

    this.titulo = 'Edit Album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('','',null,'','');
    this.is_edited = true;
}
  ngOnInit(){
        //Get album by ID.
    this.getAlbum();
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

  onSubmit() {

    //console.log(this.album);
    this._albumService.updateAlbum(this.token,this.id,this.album).subscribe(
      response => {

        if(!response.album){
          alert('Error at Server')
        }else{
          this.alertSuccess = 'Album Updated';
          //Upload Album image
          if(this.filesToUpload){
            this._uploadImageService.makeFileRequest(this.url+'uploadImageAlbum/'+this.id,[],this.filesToUpload,this.token,'image')
              .then(
                (result) => {

                  this._router.navigate(['/album',this.id])

                },
                (error) => {
                  this.errorMessage = <any>error;
                  if (this.errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                  }
                }
              );
          }

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

  public filesToUpload: Array<File>;


  fileChangeEvent(fileInput: any){

    this.filesToUpload =<Array<File>>fileInput.target.files;

  }




}
