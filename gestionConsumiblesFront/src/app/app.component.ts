import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SYNCWORKS';

  constructor(public router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
