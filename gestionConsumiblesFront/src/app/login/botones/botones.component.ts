import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css']
})
export class BotonesComponent {

  @Output() loginEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();
}
