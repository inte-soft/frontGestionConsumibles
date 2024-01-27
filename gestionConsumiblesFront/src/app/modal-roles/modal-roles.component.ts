import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Area } from '../models/ara.model';

@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrl: './modal-roles.component.css'
})
export class ModalRolesComponent {
  @Input() isOpen = false;
  @Input() users: User[] = [];
  @Input() roles: Role[] = [];
  @Input() areas: Area[] = [];
  @Input() selectedUser: User = new User(0, '','', '', '', [], new Area(0, ''));
  @Input() rolesToAdd: Role[] = [];
  @Input() actualRoles: Role[] = [];
  @Input() isRoleModalVisible: boolean = false;
  @Output() onCloseRolesModal = new EventEmitter<void>();

  selectedAssignedRol: any;
  selectedAvalibleRol: any;

  ngOnInit(): void {

    
  }

  closeModal() {
    this.onCloseRolesModal.emit();
  }

  saveChangesModal(){

  }

  moveRoleLeft() {
    if (this.selectedAssignedRol) {
      //Mueve el rol seleccionado de roles asignados a roles disponibles
      this.rolesToAdd.push(this.roles.filter(x => this.selectedAssignedRol == x.id)[0]);
      this.actualRoles = this.actualRoles.filter(
        role => role.id !== this.selectedAssignedRol[0]);
    }
  }

  moveRoleRight() {
    if (this. selectedAvalibleRol) {
      // Mueve el rol seleccionado de roles disponibles a roles asignados
      this.actualRoles.push(this.roles.filter(x => this. selectedAvalibleRol == x.id)[0]);
      this.rolesToAdd = this.rolesToAdd.filter(
        role => role.id !== this. selectedAvalibleRol[0]);
    }
  }

}

