import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Folder } from '../../models/folder.model';
import { NewOt } from '../../models/newot.model';
import { Archive } from '../../models/archive.model';
import { UploadFile } from '../../models/uploadfile.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-qrvarios',
  templateUrl: './modal-qrvarios.component.html',
  styleUrl: './modal-qrvarios.component.css'
})
export class ModalQrvariosComponent {
  @Input() isOpen = false;
  @Input() folders: Folder[] = [];
  @Input() selectedFolder: Folder = new Folder('', 0, '');
  @Input() limit: number = 10;
  @Input() ot: string = '';
  @Input() nombre: string = '';
  @Input() names: string[] = [];
  @Input() files: File[] = [];
  @Input() newOt: NewOt = new NewOt('', '', [], []);
  @Input() loading: boolean = false;
  @Input() nameFile: string = '';
  @Input() fileu: File = new File([], '');
  @Input() archives: Archive[] = [];
  @Input() uniqueFile: UploadFile = new UploadFile('', '', new File([], ''));
  @Input() element = false;
  @Input() formularios: FormGroup[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() index: number = 0;
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onSaveQr = new EventEmitter<{files: File[], ot: string, descripcion: string, names: string[]}>();
  

  constructor(private fb: FormBuilder) { }
  agregarDatos() {

    const nuevoFormulario = this.fb.group({
      nombreArchivo: [''], // Agrega un campo para el nombre del archivo en el formulario
      archivo: [''] // Agrega un campo para el archivo en el formulario
    });



    this.formularios.push(nuevoFormulario);
    return (this.element = true);
  }
    
  closeModal() {
    this.onCloseModal.emit();
  }

  borrarDatos() {
    this.formularios.splice(this.formularios.length - 1, 1);
    this.files.splice(this.files.length - 1, 1);
    return (this.element = true);
  }

  captureFile(event: any, index:any) {
    if (this.formularios[index].value.nombreArchivo == '') {
      alert('Debe ingresar un nombre para el archivo');
    } else {
        this.files[index] = event.target.files[0];


      return (this.element = true);
    }
    return (this.element = false);
    
  }
  
  gererarQR() {
    if (this.ot == '') {
      alert('Debe ingresar una OT');
      return;
    } else if (this.nombre == '') {
      alert('Debe ingresar una descripcion');
      return;
    }
    this.formularios.forEach((form, index) => {
      if (form.value.nombreArchivo == '') {
        alert('Debe ingresar un nombre para el archivo');
        return;
      }
      this.names[index] = form.value.nombreArchivo;
    }
    );
    this.onSaveQr.emit({ files: this.files, ot: this.ot, descripcion: this.nombre, names: this.names});
    setTimeout(() => {
    this.formularios = [];
    this.files = [];
    this.names = [];
    this.ot = '';
    this.nombre = '';
    }, 15000);

  }

}
