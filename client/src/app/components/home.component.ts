import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  providers: [UserService]
})

export class HomeComponent implements OnInit{
  public titulo: string;
  public artists: Artist[];
  public identity;
  public token;
  public url:string;
  constructor(
    private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService
  ){

    this.titulo = 'MUSIFY HomePage';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
}
  ngOnInit(){
    console.log('Home.component cargado');
    //conseguir el listado de artistas
  }
}
