<<<<<<< HEAD
import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/axios.service';
=======
import { Component, Output, EventEmitter} from '@angular/core';
>>>>>>> b5c969eab8a593c9c41eb9843b2cb9dfd481b272

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
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

  usuario: string = "";
  password: string = "";

  onSubmitLogin(): void{
    this.onSbmitLoginEvent.emit({usuario: this.usuario,
      password: this.password});
  }

}
