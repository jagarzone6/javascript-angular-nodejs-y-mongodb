import { Component,OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "../models/user";
import {GLOBAL} from '../services/global';


@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers:[UserService]
})

export class UserEditComponent implements OnInit {
  public titulo: string;
  public user:User;
  public identity;
  public token;
  public alertEdit;
  public errorEdit;
  public url: string;

  constructor(
    private _userService:UserService

  ){

    this.titulo = "Actualizar mis datos";
    this.identity= this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    //console.log("UserEditComponent Loaded");

  }

  onSubmitUpdate(){
    this._userService.updateUser(this.user).subscribe(

      response => {
        let user = response.user;
        //this.user =  user;
        if (!user._id){
          this.errorEdit = "El usuario no se ha actualizado correctamente ";
        }else{

          if(!this.filesToUpload){
            //Redireccion
            console.log("None files to upload");
          }else {
            this.makeFileRequest(this.url+'uploadImageUser/'+this.user._id,[],this.filesToUpload).then(
              (result:any) => {

                this.user.image = result.image;
                localStorage.setItem('identity',JSON.stringify(this.user));
                //console.log(this.user);

                let image_path = this.url + "getImageUser/" + this.user.image;
                document.getElementById("thumb_user").setAttribute('src',image_path);


              }
            )

          }

          localStorage.setItem('identity',JSON.stringify(this.user));
          //console.log(localStorage.getItem('identity'));
          this.alertEdit = "Update finalizado ! "+"User email: "+ this.user.email;
          document.getElementById("identity_name").innerHTML = this.user.name;
        }

      },
      error => {
        this.errorEdit = <any>error;
        if(this.errorEdit != null){
          var body = JSON.parse(error._body);
          this.errorEdit = body.message;
          //
        }
      }

    );


  }
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any){

    this.filesToUpload = <Array<File>>fileInput.target.files;
    //console.log(this.filesToUpload);


  }

  makeFileRequest(url:string,params:Array<String>,files:Array<File>){

    var token=this.token;
    return new Promise(function (resolve,reject) {
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0;i<files.length;i++){
        formData.append('image',files[i],files[i].name)
      }

      xhr.onreadystatechange = function () {

        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));

          } else {
            reject(xhr.response);
          }

        }
      };
      xhr.open('POST',url,true);
      xhr.setRequestHeader('authorization',token);
      xhr.send(formData);

    });
  }




}
