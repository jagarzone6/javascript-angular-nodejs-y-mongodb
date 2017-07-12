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
  <img id="play-image-album" src="../../assets/images/music.ico"/>
  </span>

  </div>

  <div class="audio-file">
    <p>Reproduciendo...</p>
    <span id="play-song-title">
    {{song.name}}
    </span>
    <span id="play-song-artist">
      <span *ngIf="song.album.artist">
        {{song.album.artist.name}}
      </span>
    </span>
    <audio controls id="player">
      <source id="mp3-source" src="{{url + 'getSongFile/' + song.file }}" type="audio/mpeg"/>
      El navegador no soporta la reproduccion del audio
    </audio>

  </div>

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
