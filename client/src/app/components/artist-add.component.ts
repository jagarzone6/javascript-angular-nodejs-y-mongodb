import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'artist-add',
  templateUrl: '../views/artist-add.html',
  providers: [UserService,ArtistService]
})

export class ArtistAddComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public alertSuccess;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
    private _artistService: ArtistService
  ){

    this.titulo = 'Add New Artist';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('','','');
}
  ngOnInit(){
    //conseguir el listado de artistas
  }

  onSubmit(){
    //console.log(this.artist);
    this._artistService.addArtist(this.token+'55',this.artist).subscribe(
      response => {

        if(!response.artist){
          alert('Error at Server')
        }else{
          this.artist = response.artist;
          this.alertSuccess = 'Artist Created';
          //this._router.navigate(['/edit-artist'],response.artist._id);
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
