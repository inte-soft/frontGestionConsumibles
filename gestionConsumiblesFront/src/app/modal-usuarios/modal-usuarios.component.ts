import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Area } from '../models/ara.model';


@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrl: './modal-usuarios.component.css'
})
export class ModalUsuariosComponent {
  @Input() isOpen = false;
  @Input() selectedUser: User = new User(0, '','', '', '', [], new Area(0, ''));;
  @Input() rolesToAdd: Role[] = [];
  @Input() actualRoles: Role[]= [];
  @Input() confirmPassword: string = '';
  @Input() newUser = false;
  @Input() areas: Area[] = [];
  @Output() onCloseUsuarios = new EventEmitter<void>();
  @Output() onSaveUser = new EventEmitter<{ selectedUser: User, confirmPassword: string }>();

  onCloseRolesModal() {
    this.onCloseUsuarios.emit();
  }

  saveNewUser(selectedUser: User, confirmPassword: any) {
    this.onSaveUser.emit({ selectedUser, confirmPassword });
  }

  saveRoles() {

  }


}