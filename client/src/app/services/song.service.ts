import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Song} from "../models/song";

@Injectable()
export class SongService{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }



  getSongs(token, album:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'getSongs/'+album,options)
      .map(res => res.json());
  }

  getSong(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'getSong/'+id,options)
      .map(res => res.json());
  }

  addSong(token,song: Song){
    let params= JSON.stringify(song);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.post(this.url+'saveSong',params,{headers:headers})
      .map(res => res.json());
  }

  updateSong(token,id:string,song: Song){
    let params= JSON.stringify(song);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.put(this.url+'updateSong/'+id,params,options)
      .map(res => res.json());
  }

  deleteSong(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+'deleteSong/'+id,options)
      .map(res => res.json());
  }

}
