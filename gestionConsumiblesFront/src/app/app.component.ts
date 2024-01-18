import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'SYNCWORKS';
  isLoggedIn: boolean = false;
  fullName: string = '';



  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.checkIfUserIsLoggedIn();
      }
    });
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
