// Importamos el decorador Component
import { Component, Input } from '@angular/core';
// importamos el decorador Input para poder recibir los datos desde el componente padre
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
//definimos las variables que vamos a recibir desde el componente padre
@Input() pageTitle!: string;
@Input() logoSrc!: string;
}
