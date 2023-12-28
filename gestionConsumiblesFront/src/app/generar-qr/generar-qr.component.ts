import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-generar-qr', 
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.css']
})
export class GenerarQRComponent {

  constructor(private fb: FormBuilder) {}  

  element = false;
  formularios: FormGroup[] = [];

  
  agregarDatos() {
    const nuevoFormulario = this.fb.group({
  
    });

    this.formularios.push(nuevoFormulario);
    return (this.element = true);
  }

  borrarDatos(index: number) {
    this.formularios.splice(index, 1);
    return (this.element = true);
  }
  
  /*Para pasar de parametro las rutas
  constructor(private router: Router){}*/
}
