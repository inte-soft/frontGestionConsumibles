import { Component, OnInit } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';
import { User } from 'src/app/models/user.model';
import { Area } from 'src/app/models/area.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: User[] = [];//variable para almacenar los datos del usuario
  selectedUser: User = new User(0, '', '', '', '', [], new Area(0, ''), '');//variable para almacenar los datos del usuario
  areas: Area[] = [];//variable para almacenar los datos del area
  confirmPassword?: string;
  newUser: boolean = false;
  userLogin: User = new User(0, '', '', '', '', [], new Area(0, ''), '');//variable para almacenar los datos del usuario
  delete: boolean = false;
  updatePass: boolean = false;
  idOperation: number = 0;
  content: any;
  newPassword: string = '';
  isUsuarioModalVisible = false;

  constructor(private axiosService: AxiosService) { }

  ngOnInit() {
    // Carga los usuarios del LocalStorage al iniciar el componente
    this.getUsers();
    this.getAreas();

  }



  createUser() {
    this.selectedUser = new User(0, '', '', '', '', [], new Area(0, ''), '');
    this.newUser = true;
    // Abre el modal utilizando NgbModal
    this.isUsuarioModalVisible = true;

  }

  closeModalUsuarios() {
    this.isUsuarioModalVisible = false;
    this.newUser = false;
    this.updatePass = false;
  }

  editUser(id: number) {
    this.selectedUser = this.users.find(x => x.id == id)!;
    // Abre el modal utilizando NgbModal
    this.isUsuarioModalVisible = true;
  }

  validarUsuario(): boolean {
    const { name, lastName, area } = this.selectedUser;
    if (!name || name.trim() === '' || !lastName || lastName.trim() === '' || !area) {
      alert('Por favor, complete todos los campos');
      return false;
    }
    // Aquí puedes agregar más validaciones según tus necesidades
    return true;
  }



  getUsers() {
    this.axiosService.request(
      'GET',
      '/users/admin/list',
      null,
      null
    ).then((response: any) => {
      this.users = response.data;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  getAreas() {
    this.axiosService.request(
      'GET',
      '/users/admin/arealist',
      null,
      null
    ).then((response: any) => {
      this.areas = response.data;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  save(selectedUser: User) {
    if (this.validarUsuario()) {
      this.axiosService.request(
        'PUT',
        '/users/admin/' + selectedUser.id + '/update',
        selectedUser,
        null
      ).then((response: any) => {
        this.getUsers();
        alert(response.data.data.message);
        this.isUsuarioModalVisible = false;
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  saveNewUser(selectedUser: User, confirmPassword: any) {

    if (this.validarUsuario() && confirmPassword === selectedUser.password) {
      this.axiosService.request(
        'POST',
        '/users/admin/register',
        selectedUser,
        null
      ).then((response: any) => {
        this.getUsers();
        this.isUsuarioModalVisible = false;
        this.newUser = false;
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      alert('Las contraseñas no coinciden o los campos estan vacios');
    }

  }

  deleteUser(id: number) {
    this.delete = true;
    
    if (confirm('Para poder eliminar el usuario debe quitarle todos los roles           ¿Está seguro de eliminar el usuario?')) {
      this.idOperation = id;
      this.axiosService.request(
        'DELETE',
        '/users/admin/' + this.idOperation + '/delete',
        null,
        null
      ).then((response: any) => {
        this.getUsers();
        this.delete = false;
        this.userLogin = new User(0, '', '', '', '', [], new Area(0, ''), '');
        alert(response.data.data.message);

      }).catch((error: any) => {
        console.log(error);
      });
    } 
      
    
  }

  updatePassword(id: number) {
    this.selectedUser = this.users.find(x => x.id == id)!;
    if (confirm('¿Está seguro de actualizar la contraseña?')) {
      this.idOperation = id;
      this.updatePass = true;
      this.isUsuarioModalVisible = true;
    }
  }

  modifyPass(selectedUser: User, confirmPassword: string) {
    const newPassword = selectedUser.password;
    if (confirmPassword === newPassword) {
      this.axiosService.request(
        'PUT',
        '/users/myuser/' + this.idOperation + '/password',
        { newPassword: newPassword },
        null
      ).then((response: any) => {
        this.getUsers();
        this.updatePass = false;
        this.isUsuarioModalVisible = false;
        this.newPassword = '';
        this.confirmPassword = '';
        alert(response.data.data.message);
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      alert('Las contraseñas no coinciden');
    }

  }

}
