import {Component,OnInit} from '@angular/core';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global'

@Component({
  selector: 'player',
  template:`
  <div class="album-image">

  <span *ngIf="song.album">
  <img id="play-image-album" src="{{url + 'getImageAlbum/'+song.album.image}}"/>
  </span>

  <<span *ngIf="!song.album">
  <img id="play-image-album" src="../../assets/images/music-image.png"/>
  </span>

  </div>
  <h1>PLAYER</h1>
  `
})

export class PlayerComponent implements OnInit{

  public url: string;
  public song:Song;

  constructor(){
    this.url = GLOBAL.url;
    this.song = new Song(null,'','','','');
  }

  ngOnInit(){
    console.log('player loaded');
  }
}
