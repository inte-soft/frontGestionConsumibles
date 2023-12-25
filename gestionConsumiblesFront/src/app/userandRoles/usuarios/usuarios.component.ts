import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];//variable para almacenar los datos del usuario
  usuario: any = {};//variable para almacenar los datos del usuario
  i: number = 0;//variable para almacenar los datos del usuario

  constructor() { }

  ngOnInit() {
    // Carga los usuarios del LocalStorage al iniciar el componente
    const usuariosGuardados = sessionStorage.getItem('usuarios');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }
  }

  limpiarFormulario() {
    this.usuario = {};//asignamos un objeto vacio a la variable usuario
  }

  crearUsuario() {
    if (this.validarUsuario()) {
      this.usuarios.push(this.usuario); // agregamos el usuario al arreglo de usuarios
      sessionStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      this.limpiarFormulario(); // limpiamos el formulario
    }
  }

  validarUsuario(): boolean {
    if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.rol || !this.usuario.estado) {
      alert('Por favor, complete todos los campos');
      return false;
    }
    // Aquí puedes agregar más validaciones según tus necesidades
    return true;
  }

  //metodo para eliminar un usuario
  eliminarUsuario(usuario: any) {
    const index = this.usuarios.indexOf(usuario);
    if (index > -1) {
      this.usuarios.splice(index, 1);
      sessionStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }
}
