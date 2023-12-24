import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import axios from 'axios';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  users: User[] = []; 
  roles: Role[] = [];
  selectedUser: User = new User(0, '', '', []);
  rolesToAdd: Role[] = [];
  actualRoles: Role[] = [];
  selectedAvailableRole:any;
  selectedAssignedRole: any;

  

  constructor(private modal: NgbModal) { }

  ngOnInit() {
    axios.get<User[]>('user/list')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error al obtener usuarios', error);
      });

    axios.get<Role[]>('role/list')
      .then(response => {
        this.roles = response.data;
      })
      .catch(error => {
        console.error('Error al obtener roles', error);
      });

      // addusers
      this.users.push(new User(1, 'Juan', 'Perez', [new Role(3, 'Almacen'), new Role(2, 'Usuario')]));
      // addroles
      this.roles.push(new Role(1, 'Administrador'));
      this.roles.push(new Role(2, 'Usuario'));
      this.roles.push(new Role(3, 'Almacen'));
      
  }

  editRol(id: number, contenido: any) {
    this.selectedUser = this.users.find(x => x.id == id)!;
    this.actualRoles = this.selectedUser.rol;
    this.rolesToAdd = this.roles.filter(
      x => !this.selectedUser.rol.map(r => r.id).includes(x.id));

    // Abre el modal utilizando NgbModal
    this.modal.open(contenido , { size: 'xl', backdrop: 'static'});
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
    axios.put('user/'+this.selectedUser.id, this.selectedUser)
    .then(response => {
      this.closeModal();
      alert('Roles actualizados correctamente');
    }).catch(error => {
      alert('Error al actualizar roles/n'+error.response.data.message);
    
  });
}
}

