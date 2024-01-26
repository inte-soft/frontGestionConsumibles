import { Component, OnInit } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';
import { User } from 'src/app/models/user.model';
import { Area } from 'src/app/models/area.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private axiosService: AxiosService, private modal: NgbModal) { }

  ngOnInit() {
    // Carga los usuarios del LocalStorage al iniciar el componente
    this.getUsers();
    this.getAreas();

  }

  cancel() {
    this.modal.dismissAll();
  }

  createUser() {
    this.selectedUser = new User(0, '', '', '', '', [], new Area(0, ''), '');
    this.newUser = true;
    // Abre el modal utilizando NgbModal
    this.isUsuarioModalVisible = true;

  }

  closeModalUsuarios() {
    this.isUsuarioModalVisible = false;
  }

  editUser(id: number) {
    this.selectedUser = this.users.find(x => x.id == id)!;
    this.newUser = false;
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
      '/users/list',
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
      '/users/arealist',
      null,
      null
    ).then((response: any) => {
      this.areas = response.data;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  save() {
    if (this.validarUsuario()) {
      this.axiosService.request(
        'PUT',
        '/users/' + this.selectedUser.id + '/update',
        this.selectedUser,
        null
      ).then((response: any) => {
        this.getUsers();
        console.log(response);
        alert(response.data.data.message);
        this.modal.dismissAll();
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  saveNewUser(selectedUser: User, confirmPassword: any) {

    if (this.validarUsuario() && confirmPassword === selectedUser.password) {
      this.axiosService.request(
        'POST',
        '/users/register',
        selectedUser,
        null
      ).then((response: any) => {
        this.getUsers();
        this.modal.dismissAll();
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      alert('Las contraseñas no coinciden o los campos estan vacios');
    }

  }

  deleteUser(id: number, contenido2: any) {
    this.delete = true;
    
    if (confirm('¿Está seguro de eliminar el usuario?')) {
      this.idOperation = id;
      this.modal.open(contenido2, { size: 'xl', backdrop: 'static' });
      
    }
  }

  updatePassword(id: number, contenido2: any) {
    this.updatePass = true;
    
    if (confirm('¿Está seguro de actualizar la contraseña?')) {
      this.idOperation = id;

      this.modal.open(contenido2, { size: 'xl', backdrop: 'static' });
    }
  }

  login(userLogin: User, confirmPassword: any) {
    if (userLogin.userName !== '' && userLogin.password !== '') {
      this.axiosService.request(
        'POST',
        '/login',
        userLogin,
        null
      ).then((response: any) => {
        if (this.delete) {
          this.axiosService.request(
            'DELETE',
            '/users/' + this.idOperation + '/delete',
            null,
            null
          ).then((response: any) => {
            this.getUsers();
            this.modal.dismissAll();
            this.delete = false;
            this.userLogin = new User(0, '', '', '', '', [], new Area(0, ''), '');
            alert(response.data.data.message);

          }).catch((error: any) => {
            console.log(error);
          });
        } else if (this.updatePass) {
          this.modal.dismissAll();
          this.userLogin = new User(0, '', '', '', '', [], new Area(0, ''), '');
          this.modal.open(this.content, { size: 'xl', backdrop: 'static' });
          
        }
      }).catch((error: any) => {
        alert('Usuario o contraseña incorrectos');
      });
    }
    
  }

  modifyPass(newPassword: string, confirmPassword: any) {
    if (confirmPassword === newPassword) {
      this.axiosService.request(
        'PUT',
        '/users/' + this.idOperation + '/password',
        { newPassword: newPassword },
        null
      ).then((response: any) => {
        this.getUsers();
        this.modal.dismissAll();
        this.updatePass = false;
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
