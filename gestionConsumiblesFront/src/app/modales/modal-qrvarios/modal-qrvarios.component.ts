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

  borrarDatos(index: number) {
    this.formularios.splice(index, 1);
    return (this.element = true);
  }

  captureFile(event: any, index: number) {
    if (this.formularios[index].value.nombreArchivo == '') {
      alert('Debe ingresar un nombre para el archivo');
    } else {
      this.files[index] = event.target.files[0];
      this.names[index] = this.formularios[index].value.nombreArchivo;
      this.formularios[index].patchValue({
        archivo: this.files[index]
      });

      return (this.element = true);
    }
    
    // Agregar declaración de retorno al final de la función
    return null;
  }
  
  gererarQR() {
    this.onSaveQr.emit({ files: this.files, ot: this.ot, descripcion: this.nombre, names: this.names});
  }

}
