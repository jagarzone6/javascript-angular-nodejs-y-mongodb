import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Album} from "../models/album";

@Injectable()
export class AlbumService{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }



  getAlbums(token, artist:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'getAlbums/'+artist,options)
      .map(res => res.json());
  }

  getAlbum(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'getAlbum/'+id,options)
      .map(res => res.json());
  }

  addAlbum(token,album: Album){
    let params= JSON.stringify(album);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.post(this.url+'saveAlbum',params,{headers:headers})
      .map(res => res.json());
  }

  updateAlbum(token,id:string,album: Album){
    let params= JSON.stringify(album);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.put(this.url+'updateAlbum/'+id,params,options)
      .map(res => res.json());
  }

  deleteAlbum(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+'deleteAlbum/'+id,options)
      .map(res => res.json());
  }

}
