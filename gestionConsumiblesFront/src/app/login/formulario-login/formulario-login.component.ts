import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit{

  //definimos las variables que vamos a recibir desde el componente padre
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;

  constructor(private router: Router, private axiosService: AxiosService) { }
  //esto es para que el componente padre pueda escuchar el evento
    @Output() onLoginTabEvent = new EventEmitter();
  //esto es para que el componente padre pueda escuchar el evento
    @Output() onSbmitLoginEvent = new EventEmitter();

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
      }, null
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
