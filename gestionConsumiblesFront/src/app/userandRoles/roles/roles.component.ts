import { Role } from './../../models/role.model';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AxiosService } from 'src/app/axios.service';
import { Area } from 'src/app/models/area.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  selectedUser: User = new User(0, '','', '', '', [], new Area(0, ''), '');
  areas: Area[] = [];
  rolesToAdd: Role[] = [];
  actualRoles: Role[] = [];
  selectedAvailableRole: any;
  selectedAssignedRole: any;
  isRoleModalVisible = false;


  constructor( private axiosService: AxiosService) { }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  editRol(id: number) {
    this.selectedUser = this.users.find(x => x.id == id)!;
    console.log(this.selectedUser);
    this.actualRoles = this.selectedUser.rol;
    this.rolesToAdd = this.roles.filter(role => {
      return !this.selectedUser.rol.some(userRole => userRole.id === role.id);
    });

    this.isRoleModalVisible = true;
  }

  closeModal() {
    this.isRoleModalVisible = false;
  }

  saveChanges() {
    // codigo para consumir el servicio de actualizar roles
    this.axiosService.request(
      "put",
      "/users/" + this.selectedUser.id + "/roles",
      this.selectedUser,
      null
    ).then(response => {
      alert('Roles actualizados correctamente');
      this.getUsers();
      this.closeModal();
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

