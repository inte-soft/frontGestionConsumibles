import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
<<<<<<< HEAD
import { Area } from '../models/area.model';
=======
import { Area } from '../models/ara.model';
>>>>>>> 355a03692ec1fb07f9379c8a63a3e92d667e3cd1


@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrl: './modal-usuarios.component.css'
})
export class ModalUsuariosComponent {
  @Input() isOpen = false;
<<<<<<< HEAD
  @Input() selectedUser: User = new User(0, '','', '', '', [], new Area(0, ''), '');
=======
  @Input() selectedUser: User = new User(0, '','', '', '', [], new Area(0, ''));;
>>>>>>> 355a03692ec1fb07f9379c8a63a3e92d667e3cd1
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


<<<<<<< HEAD
}
=======
}
>>>>>>> 355a03692ec1fb07f9379c8a63a3e92d667e3cd1
