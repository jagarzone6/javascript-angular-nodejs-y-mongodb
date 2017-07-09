import { Component } from '@angular/core';
import {User} from "./models/user";
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
})
export class AppComponent {
  public title = 'MUSIFY!';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public errorMessage2;
  public alertRegister;
  public url: string;
  constructor(private _userService:UserService,
              private _route: ActivatedRoute,
              private _router: Router){
    this.user = new User("","","","","","ROLE_USER","");
    this.user_register = new User("","","","","","ROLE_USER","");
    this.url = GLOBAL.url;

  }
  ngOnInit(){
    this.identity= this._userService.getIdentity();
    this.token = this._userService.getToken();

    //console.log(this.identity);
    //console.log(this.token);
  }

  public onSubmit(){
    //datos del usuario
    this._userService.signin(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        } else {
          //Crear elemento localstorage para mantener la sesion

          localStorage.setItem('identity',JSON.stringify(this.identity));


          //Conseguir el token para las peticiones del usuario

          this._userService.signin(this.user,'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if(this.token.length < 1){
                alert("El token no se ha generado correctamente ");
              } else {
                //Crear elemento localstorage(token) para mantener la sesion

                localStorage.setItem('token',token);
                this.user = new User("","","","","","ROLE_USER","");

              }
            },
            error => {
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                //
              }
            }
          );


        }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

        }
      }
    );
  }
  public logout(){
    localStorage.clear();

    this.identity = null;
    this.token =null;
    this._router.navigate(['/']);

  }

  public onSubmitRegister(){

    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register =  user;
        if (!this.user_register._id){
          this.errorMessage2 = "El usuario no se ha registrado correctamente ";
        }else{

          this.alertRegister = "Registro finalizado ! "+"User email: "+ this.user_register.email;
          this.user_register = new User("","","","","","ROLE_USER","");

        }

      },
    error => {
      this.errorMessage2 = <any>error;
      if(this.errorMessage2 != null){
        var body = JSON.parse(error._body);
        this.errorMessage2 = body.message;
        //
      }
    }
    );

  }


}
