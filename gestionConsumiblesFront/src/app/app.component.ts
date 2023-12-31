<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
>>>>>>> fc85c95c94f7e4390438f23fb8a34e27bbe79eb7

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'SYNCWORKS';
<<<<<<< HEAD

  constructor(public router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
=======
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

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
>>>>>>> fc85c95c94f7e4390438f23fb8a34e27bbe79eb7
  }
}
