import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent{
//esto es para que el componente padre pueda escuchar el evento
  @Output() onSbmitLoginEvent = new EventEmitter();

  usuario: string = "";
  password: string = "";

  onSubmitLogin(): void{
    this.onSbmitLoginEvent.emit({usuario: this.usuario,
      password: this.password});
  }

}
