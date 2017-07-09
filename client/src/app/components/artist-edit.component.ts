import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';
import {UploadImageService} from '../services/upload-image.service';

@Component({
  selector: 'artist-edit',
  templateUrl: '../views/artist-edit.html',
  providers: [UserService,ArtistService,UploadImageService]
})

export class ArtistEditComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
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
    private _artistService: ArtistService,
    private _uploadImageService: UploadImageService
  ){

    this.titulo = 'Edit Artist';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('','','');
    this.is_edited = true;
}
  ngOnInit(){
    //conseguir el listado de artistas
    //Get artist by ID.
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

    //console.log(this.artist);
    this._artistService.updateArtist(this.token,this.id,this.artist).subscribe(
      response => {

        if(!response.artist){
          alert('Error at Server')
        }else{
          this.alertSuccess = 'Artist Updated';
          //Upload artist image
          if(this.filesToUpload){
            this._uploadImageService.makeFileRequest(this.url+'uploadImageArtist/'+this.id,[],this.filesToUpload,this.token,'image')
              .then(
                (result) => {

                  this._router.navigate(['/artists',1])

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
