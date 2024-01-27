import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AxiosService } from 'src/app/axios.service';
import { Area } from 'src/app/models/ara.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  selectedUser: User = new User(0, '','', '', '', [], new Area(0, ''));
  rolesToAdd: Role[] = [];
  actualRoles: Role[] = [];
  selectedAvailableRole: any;
  selectedAssignedRole: any;
  isRoleModalVisible: boolean = false;



  constructor(private modal: NgbModal, private axiosService: AxiosService) { }

  ngOnInit() {
    this.getUsers();

    this.getRoles();


  }

  editRol(id: number, contenido: any) {
    this.selectedUser = this.users.find(x => x.id == id)!;
    this.actualRoles = this.selectedUser.rol;
    this.rolesToAdd = this.roles.filter(role => {
      return !this.selectedUser.rol.some(userRole => userRole.id === role.id);
    });

    // Abre el modal utilizando NgbModal
    this.modal.open(contenido);
  }
  closeModal() {
    this.modal.dismissAll();
  }
  moveRoleRight() {
    if (this.selectedAvailableRole) {
      // Mueve el rol seleccionado de roles disponibles a roles asignados
      this.actualRoles.push(this.roles.filter(x => this.selectedAvailableRole == x.id)[0]);
      this.rolesToAdd = this.rolesToAdd.filter(
        role => role.id !== this.selectedAvailableRole[0]);
    }
  }

  moveRoleLeft() {
    if (this.selectedAssignedRole) {
      // Mueve el rol seleccionado de roles asignados a roles disponibles
      this.rolesToAdd.push(this.roles.filter(x => this.selectedAssignedRole == x.id)[0]);
      this.actualRoles = this.actualRoles.filter(
        role => role.id !== this.selectedAssignedRole[0]);
    }
  }
  saveChanges() {
    // codigo para consumir el servicio de actualizar roles
    this.selectedUser.rol = this.actualRoles;
    this.axiosService.request(
      "put",
      "/users/" + this.selectedUser.id + "/roles",
      this.selectedUser,
      null
    ).then(response => {
      alert('Roles actualizados correctamente');
      this.getUsers();
      this.modal.dismissAll();
    }).catch(error => {
      alert('Error al actualizar roles ' + error.response.data.message);

    });
  }

  getRoles(){
    this.axiosService.request(
      "GET",
      "/users/roles",
      null,
      null
    ).then(response => {
      this.roles = response.data;
    }).catch(error => {
      alert('Error al obtener roles ' + error.response.data.message);
      console.error('Error al obtener roles', error);
    });
  }

  getUsers(){
    this.axiosService.request(
      "GET",
      "/users/list",
      null,
      null
    ).then(response => {
      this.users = response.data;
    }).catch(error => {
      alert('Error al obtener usuarios ' + error.response.data.message);
      console.error('Error al obtener usuarios', error);
    });
  }

}

