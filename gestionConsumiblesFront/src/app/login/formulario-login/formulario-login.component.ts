import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit{

  constructor(private router: Router) { }

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

    this.router.navigate(['/menu']);
    // este es el evento que se emite para que el componente padre lo escuche
    this.onSbmitLoginEvent.emit({usuario: this.usuario,
      password: this.password});

  }

}
