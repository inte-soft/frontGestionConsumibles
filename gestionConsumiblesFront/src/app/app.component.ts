import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
<<<<<<< HEAD
=======
import { User } from './models/user.model';
import { Role } from './models/role.model';
>>>>>>> 81224b0a223508fc29e249ed8852bf65c0320c8c

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'SYNCWORKS';
  isLoggedIn: boolean = false;
<<<<<<< HEAD
  fullName: string = '';
  userAvatar = 'assets/imagenes/logoDemco.png';


=======
  fullName: string = '';//este metodo es para verificar si el usuario tiene un rol
  Admin = false;
  Comercial = false;
  Ing = false;
  Proyect = false;
  roles: Role[] = [];
>>>>>>> 81224b0a223508fc29e249ed8852bf65c0320c8c

  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.checkIfUserIsLoggedIn();
      }
    });
<<<<<<< HEAD
    this.avatarInfo();
=======

    this.fullName = window.sessionStorage.getItem("FULLNAME") || '';
    this.roles = JSON.parse(window.sessionStorage.getItem("ROLES") || '{}');
    this.getroles(this.roles);
  }

  getroles(roles: Role []) {
    for (let rol of roles) {
      if (rol.id == 1) {
        this.Admin = true;
      }
      if (rol.id == 2) {
        this.Comercial = true;
      }
      if (rol.id == 3) {
        this.Ing = true;
      }
      if (rol.id == 4) {
        this.Proyect = true;
      }
    }
>>>>>>> 81224b0a223508fc29e249ed8852bf65c0320c8c
  }

  checkIfUserIsLoggedIn(): boolean {
    if (localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }

  public infoUserLogged(name: string, lastName: string) {
    this.fullName = name + ' ' + lastName;
  }

  public userAvatarLogged(avatar: string) {
    this.userAvatar = avatar;
  }

  public avatarInfo() {
    this.userAvatar = window.sessionStorage.getItem('avatar') ?? 'assets/imagenes/logoDemco.png';
    this.fullName = window.sessionStorage.getItem('name') + ' ' + window.sessionStorage.getItem('lastName');
  }
}