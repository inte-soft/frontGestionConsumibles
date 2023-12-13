// aca se importan los modulos necesarios para el funcionamiento del componente
import { Component } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';
//este componente es el que se encarga de mostrar el formulario de login y registro
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
//exportamos la clase para poder usarla en otros componentes
export class AuthenticationComponent {

  data: string[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    //llamamos al metodo para solicitar los servicios de Axios
    this.axiosService.request(
      "GET",
      "/messeges",
      {},
    ).then(
      //se alamcena la respueata en la variable data
      (response) => this.data = response.data
    );
  }
}
