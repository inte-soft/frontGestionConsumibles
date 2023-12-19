import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit{

  constructor(private router: Router, private axiosService: AxiosService) { }

  ngOnInit(){

  }
  //esto es para que el componente padre pueda escuchar el evento
  @Output() onSbmitLoginEvent = new EventEmitter();

  active: string = "login";
  usuario: string = "";
  password: string = "";

    onLoginTab(): void{
      this.active = "login";
    }
    onSubmitLogin(): void{

        this.axiosService.request(
          "POST",
          "/login",
          {
            userName: this.usuario,
            password: this.password
          }
        ).then(response => {
            this.axiosService.setAuthToken(response.data.token);
            this.router.navigate(['/menu']);
        }).catch((error: HttpErrorResponse) => {
          if(error.status == 404 || error.status == 400){
            console.log("Usuario o contraseña incorrectos");
          }
        });
      }
}
