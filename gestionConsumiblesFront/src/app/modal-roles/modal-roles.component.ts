import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Area } from '../models/area.model';

@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrl: './modal-roles.component.css'
})
export class ModalRolesComponent {
  @Input() isOpen = false;
  @Input() users: User[] = [];
  @Input() roles: Role[] = [];
  @Input() selectedUser: User = new User(0, '','', '', '', [], new Area(0, '') , '');
  @Input() rolesToAdd: Role[] = [];
  @Input() actualRoles: Role[] = [];
  @Input() selectedAvailableRole: any;
  @Input() selectedAssignedRole: any;
  @Input() isRoleModalVisible: boolean = false;
  @Output() onCloseRolesModal = new EventEmitter<void>();

  closeModal() {
    this.onCloseRolesModal.emit();
  }

  saveChangesModal(){

  }

  moveRoleLeft() {
    if (this.selectedAssignedRole) {
      // Mueve el rol seleccionado de roles asignados a roles disponibles
      this.rolesToAdd.push(this.roles.filter(x => this.selectedAssignedRole == x.id)[0]);
      this.actualRoles = this.actualRoles.filter(
        role => role.id !== this.selectedAssignedRole[0]);
    }
  }

  moveRoleRight() {
    if (this.selectedAvailableRole) {
      // Mueve el rol seleccionado de roles disponibles a roles asignados
      this.actualRoles.push(this.roles.filter(x => this.selectedAvailableRole == x.id)[0]);
      this.rolesToAdd = this.rolesToAdd.filter(
        role => role.id !== this.selectedAvailableRole[0]);
    }
  }

}

