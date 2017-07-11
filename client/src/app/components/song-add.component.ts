import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {SongService} from '../services/song.service';
import {Album} from '../models/album';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';
import {UploadImageService} from '../services/upload-image.service';

@Component({
  selector: 'song-add',
  templateUrl: '../views/song-add.html',
  providers: [UserService,SongService,UploadImageService]
})

export class SongAddComponent implements OnInit{
  public titulo: string;
  public song : Song;
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
    private _songService: SongService,
    private _uploadImageService: UploadImageService
  ){

    this.titulo = 'Add Song';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(null,'',null,'',_route.snapshot.params['album']);
}
  ngOnInit(){
    //conseguir el listado de artistas
    //Get artist by ID.
    console.log(this.song);
  }

onSubmit(){
  this._songService.addSong(this.token,this.song).subscribe(
      response => {

        if(!response.songStored){
          alert('Error at Server')
        }else{
          this.song = response.songStored;
          this.alertSuccess = 'Song Created';
          //this._router.navigate(['/update-song',response.songStored._id]);
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
