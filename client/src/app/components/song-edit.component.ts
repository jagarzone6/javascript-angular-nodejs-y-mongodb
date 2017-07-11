import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {SongService} from '../services/song.service';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';
import {UploadImageService} from '../services/upload-image.service';

@Component({
  selector: 'song-edit',
  templateUrl: '../views/song-edit.html',
  providers: [UserService,SongService,UploadImageService]
})

export class SongEditComponent implements OnInit{
  public titulo: string;
  public song: Song;
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
    private _songService: SongService,
    private _uploadService: UploadImageService
  ){

    this.titulo = 'Edit Song';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(null,'','','','');
    this.is_edited = true;
}
  ngOnInit(){
        //Get song by ID.
    this.getSong();
  }

  getSong(){
    this._route.params.forEach((params:Params)=>{
      this.id= params['id'];
      this._songService.getSong(this.token,this.id).subscribe(
        response => {

          if(!response.song){
            this._router.navigate(['/']);
          }else {
            this.song = response.song;
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

    //console.log(this.song);
    this._songService.updateSong(this.token,this.id,this.song).subscribe(
      response => {

        if(!response.song){
          alert('Error at Server')
        }else{
          this.alertSuccess = 'Song Updated';
          //Upload Song image
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(this.url+'uploadSongFile/'+this.id,[],this.filesToUpload,this.token,'file')
              .then(
                (result) => {

                  this._router.navigate(['/album',response.song.album]);

                },
                (error) => {
                  this.errorMessage = <any>error;
                  if (this.errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                  }
                }
              );
          } else { this._router.navigate(['/album',response.song.album])}

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
