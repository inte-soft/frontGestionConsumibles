import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Archive } from '../../models/archive.model';
import { UploadFile } from '../../models/uploadfile.model';
import { Folder } from '../../models/folder.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-modal-folderedit',
  templateUrl: './modal-folderedit.component.html',
  styleUrl: './modal-folderedit.component.css',
})
export class ModalFoldereditComponent implements OnChanges {
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
  @Output() onViewFile = new EventEmitter<{ archive: Archive }>();
  @Output() onDeleteFile = new EventEmitter<{ archive: Archive }>();
  @Output() onUploadUniqueFile = new EventEmitter<{ uniqueFile: UploadFile }>();

  opciones: string[] = [];
  option: string = '';

  cargaArchivos: boolean = false;

  planos: string[] = [
    'PLANOS MECANICOS',
    'PLANOS ELECTRICOS',
    'PROTOCOLOS DE PRUEBAS',
    'CERTIFICADOS',
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && changes['isOpen'].currentValue == true) {
      this.validar();
    }
    if(changes['archives']){
      this.validar();
    }
  }

  validar(){
    this.opciones = [];
    this.opciones = this.planos.filter((option) => {
      return !this.archives.some((archive) => archive.name === option);
    });
    this.option = this.opciones[0];
    if (this.opciones.length == 0) {
      this.option = '';
      this.cargaArchivos = true;
    }
    this.cargaArchivos = false;
  }

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
    } else {
      try {
        this.uniqueFile.idFolder = this.selectedFolder.id;
        this.uniqueFile.name = this.option;
        this.onUploadUniqueFile.emit({ uniqueFile: this.uniqueFile });
        this.nameFile = '';
        this.count = 0;
        this.validar();
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }
  viewFile(archive: Archive) {
    this.onViewFile.emit({ archive: archive });
  }

  deleteFile(archive: Archive) {
    this.onDeleteFile.emit({ archive: archive });
  }
}
