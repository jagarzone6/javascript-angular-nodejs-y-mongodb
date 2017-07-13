import {Component,OnInit} from '@angular/core';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global'

@Component({
  selector: 'player',
  template:`
  <div class="album-image">

  <span>
  <img id="player-image-album" src="../../assets/images/music.ico"  *ngIf="url + 'getImageAlbum/'+song.album.image == url + 'getImageAlbum/'+'null'"/>
  <img id="player-image-album" src="{{url + 'getImageAlbum/'+song.album.image}}"  *ngIf="url + 'getImageAlbum/'+song.album.image != url + 'getImageAlbum/'+'null'"/>
  </span>

  </div>

  <div class="audio-file">
    <p>Reproduciendo...</p>
    <span id="play-song-title">
    {{song.name}}
    </span>
    <span id="play-song-artist">
      <span *ngIf="song.album.artist">
        - {{song.album.artist.name}}
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

    var song = JSON.parse(localStorage.getItem("sound_song"));
    if(song){
      this.song = song;
    }else {
      this.song = new Song(1,'','','','');
    }
  }
}
