import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit{

  private appComponent: AppComponent;
  //definimos las variables que vamos a recibir desde el componente padre
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;
  

  constructor(private router: Router, private axiosService: AxiosService, appComponent: AppComponent) {
    this.appComponent = appComponent;
   }
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
      this.appComponent.infoUserLogged(response.data.name, response.data.lastName);
      window.sessionStorage.setItem("name", response.data.name);
      window.sessionStorage.setItem("lastName", response.data.lastName);
      window.sessionStorage.setItem("id", response.data.id);
      this.axiosService.setAuthToken(response.data.token);
      this.getAvatar();
      // esperar un segundo para que se cargue la imagen
      setTimeout(() => {
        this.appComponent.userAvatarLogged(window.sessionStorage.getItem('avatar') ?? 'assets/imagenes/logoDemco.png');
      }, 1000);
      this.appComponent.avatarInfo();
      this.router.navigate(['/menu']);
    }).catch((error: any) => {
      if (error.response.data.message == "Unknown user" || error.response.data.message == "Invalid password") {
        this.usuario = "";
        this.password = "";
        alert("Usuario o contraseña incorrectos");
      }
    });

    
  }
  getAvatar(){
    const id = window.sessionStorage.getItem('id');
    this.axiosService.request(
      'GET',
      'http://localhost:8080/users/myuser/'+id+'/photo',
      {},
    ).then((response: any) => {
      const avatar = 'data:image/jpeg;base64,' + response.data.data.message;
      window.sessionStorage.setItem('avatar', avatar);
    }).catch((error: any) => {  
      console.log(error);
    });
    
  }


}
