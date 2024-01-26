import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from './models/user.model';
import { Role } from './models/role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'SYNCWORKS';
  isLoggedIn: boolean = false;
  fullName: string = '';//este metodo es para verificar si el usuario tiene un rol
  Admin = false;
  Comercial = false;
  Ing = false;
  Proyect = false;
  roles: Role[] = [];

  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.checkIfUserIsLoggedIn();
      }
    });

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
}
