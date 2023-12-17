import { Component } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent {
// este es el componente que se muestra en el login
  componentToShow: string = "Bienvenido Alfredi";
// este es el constructor del componente
  constructor(private axiosService: AxiosService) {}
// este metodo cambia el componente que se muestra en el login
  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }
//este metodo hace la peticion al servidor para logearse
    onLogin(input: any): void {
      this.axiosService.request(
        "POST",
        "/login",
        {
          userName: input.usuario,
          password: input.password
        }
      ).then(response => {
        this.axiosService.setAuthToken(response.data.token);
        this.componentToShow = "message";
      });
    }
}
