import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal-qrimage',
  templateUrl: './modal-qrimage.component.html',
  styleUrl: './modal-qrimage.component.css'
})
export class ModalQrimageComponent {

  @Input() isOpenQr = false;
  @Input() image: any = null;
  @Output() onCloseModalQR = new EventEmitter<void>();
  @Output() onSaveQr = new EventEmitter<void>();


  saveQr() {
    this.onSaveQr.emit();
  }

  closeModal() {
    this.onCloseModalQR.emit();
  }
}
