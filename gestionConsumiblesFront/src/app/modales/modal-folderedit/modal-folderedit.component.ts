import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Archive } from '../../models/archive.model';
import { UploadFile } from '../../models/uploadfile.model';
import { Folder } from '../../models/folder.model';

@Component({
  selector: 'app-modal-folderedit',
  templateUrl: './modal-folderedit.component.html',
  styleUrl: './modal-folderedit.component.css'
})
export class ModalFoldereditComponent {
  @Input() isOpen = false;
  @Input() folder = '';
  @Input() id = 0;
  @Input() fileU = new File([], '');
  @Input() nameFile = '';
  @Input() loading = false;
  @Input() archives: Archive[] = [];
  @Input() uniqueFile: UploadFile = new UploadFile('', '', new File([], ''));
  @Input() selectedFolder: Folder = new Folder('', 0, '');
  @Output() onCloseModalFolderEdit = new EventEmitter<void>();
  @Output() onViewFile = new EventEmitter<{archive: Archive}>();
  @Output() onDeleteFile = new EventEmitter<{archive: Archive}>();
  @Output() onUploadUniqueFile = new EventEmitter<{uniqueFile: UploadFile}>();
  count: number = 0;




  closeModal() {
    this.onCloseModalFolderEdit.emit();
  }



  captureUniqueFile(event: any) {
    this.uniqueFile.file = event.target.files[0];
    this.count = 1;
  }

  uploadUniqueFile() {
    if (this.count == 0) {
      alert('No se ha seleccionado ningún archivo');
      return;
    }else if (this.nameFile == '') {
      alert('No se ha ingresado el nombre del archivo');
      return;
    }else{
    this.uniqueFile.idFolder = this.selectedFolder.id;
    this.uniqueFile.name = this.nameFile;
    this.onUploadUniqueFile.emit({uniqueFile: this.uniqueFile});
    this.nameFile = '';
    this.count = 0;
    }
  }

  viewFile(archive: Archive) { 
    this.onViewFile.emit({archive: archive});
  }

  deleteFile(archive: Archive) {
    this.onDeleteFile.emit({archive: archive});
    
  }
}
