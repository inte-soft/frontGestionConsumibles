<<<<<<< HEAD
<<<<<<< HEAD
import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
=======
import { Component, Output, EventEmitter} from '@angular/core';
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
<<<<<<< HEAD
<<<<<<< HEAD
export class FormularioLoginComponent implements OnInit{

  //definimos las variables que vamos a recibir desde el componente padre
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;

  constructor(private router: Router, private axiosService: AxiosService) { }

  ngOnInit(){

  }
  //esto es para que el componente padre pueda escuchar el evento
=======
export class FormularioLoginComponent{
//esto es para que el componente padre pueda escuchar el evento
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272
  @Output() onSbmitLoginEvent = new EventEmitter();
=======
export class FormularioLoginComponent {
  //esto es para que el componente padre pueda escuchar el evento
  constructor(private router: Router, private axiosService: AxiosService) { }
>>>>>>> 5b5b678f348ee7a3f84c3c8777111ad55279824c

  ngOnInit(): void {
    window.sessionStorage.removeItem("AUTHORIZATION");
  }

  active: string = "login";
  usuario: string = "";
  password: string = "";

  onLoginTab(): void {
    this.active = "login";
  }
  onSubmitLogin(): void {
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
    }).catch((error: any) => {
      if (error.response.data.message == "Unknown user" || error.response.data.message == "Invalid password") {
        this.usuario = "";
        this.password = "";
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
}
