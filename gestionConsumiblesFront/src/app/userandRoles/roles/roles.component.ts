import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import axios from 'axios';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  users: User[] = []; 
  roles: Role[] = [];
  selectedUser: User = new User(0, '', '', []);

  constructor(@Inject(NgbModal) private modalService: NgbModal) { }

  ngOnInit() {
    axios.get<User[]>('URL_DEL_BACKEND_PARA_USUARIOS')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error al obtener usuarios', error);
      });

    axios.get<Role[]>('URL_DEL_BACKEND_PARA_ROLES')
      .then(response => {
        this.roles = response.data;
      })
      .catch(error => {
        console.error('Error al obtener roles', error);
      });

      // addusers
      this.users.push(new User(1, 'Juan', 'Perez', [new Role(1, 'Administrador'), new Role(2, 'Usuario')]));
      // addroles
      this.roles.push(new Role(1, 'Administrador'));
      
  }

  editRol(id: number) {
    this.selectedUser = this.users.find(x => x.id == id)!;

    // Abre el modal utilizando NgbModal
    this.modalService.open('#editRolModal', { size: 'lg' });
  }
}