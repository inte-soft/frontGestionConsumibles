import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../models/folder.model';
import { NewOt } from '../../models/newot.model';
import { Archive } from '../../models/archive.model';
import { UploadFile } from '../../models/uploadfile.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AxiosService } from 'src/app/axios.service';


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
  @Input() image: any = null;
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onSaveQr = new EventEmitter<{ image: any }>();
  axiosService: AxiosService;


  constructor(private fb: FormBuilder, axiosService: AxiosService) {
    this.axiosService = axiosService;

  }

  ngOnInit() {
    this.agregarDatos('PLANOS ELECTRICOS');
    this.agregarDatos('PLANOS MECANICOS');
    this.agregarDatos('PROTOCOLOS DE PRUEBAS');
    this.agregarDatos('CERTIFICADOS');
  }

  agregarDatos(Nombre: string) {

    const nuevoFormulario = this.fb.group({
      nombreArchivo: [Nombre], // Agrega un campo para el nombre del archivo en el formulario
      //archivo: [''] // Agrega un campo para el archivo en el formulario
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

  captureFile(event: any, index: any) {
    if (this.formularios[index].value.nombreArchivo == '') {
      alert('Debe ingresar un nombre para el archivo');
      this.formularios[index].value.archivo = '';
    } else {
      this.files[index] = event.target.files[0];

    }

  }

  gererarQR() {
    if (this.ot == '') {
      alert('Debe ingresar una OT');
      return;
    } else if (this.nombre == '') {
      alert('Debe ingresar una descripcion');
      return;
    }
    for (let index = this.formularios.length - 1; index >= 0; index--) {
      const form = this.formularios[index];
      if (this.files[index] === undefined) {
          // Eliminar el formulario, archivo y nombre asociado
          this.formularios.splice(index, 1);
          this.files.splice(index, 1);
          this.names.splice(index, 1);
      } else {
          // Actualizar el nombre asociado
          this.names[index] = form.value.nombreArchivo;
      }
    }

    if (this.names.length === 0) {
      this.ngOnInit();
      alert('Por favor, complete todos los campos');
      return;
    }

    if (this.ot === '' || this.nombre === '' || this.files.length === 0) {
      alert('Por favor, complete todos los campos');
      return;
    }
    this.newOt.ot = this.ot;
    this.newOt.name = this.nombre;
    this.newOt.names = this.names;
    this.newOt.files = this.files;
    this.loading = true;
    const formData = new FormData();
    formData.append('ot', this.newOt.ot);
    formData.append('name', this.newOt.name);
    formData.append('names', this.newOt.names.toString());
    this.newOt.files.forEach((file) => {
      formData.append('files', file);
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    this.axiosService.request(
      'POST',
      '/drive/upload-ot',
      formData,
      config
    ).then((response: any) => {

      this.loading = false;
      // Suponiendo que `response.data` contiene los datos base64 de la imagen
      const imageData = response.data;
      this.image = imageData;
      this.formularios = [];
      this.files = [];
      this.names = [];
      this.ot = '';
      this.nombre = '';
      this.onSaveQr.emit({ image: this.image });
      this.closeModal();
    // Asigna directamente los datos base64 al atributo `src` de la imagen

  }).catch((error: any) => {
    this.loading = false;
    console.error(error);
  });


  }

}
