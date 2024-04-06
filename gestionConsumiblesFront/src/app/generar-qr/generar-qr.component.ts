import { Component,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Folder } from '../models/folder.model';
import { AxiosService } from '../axios.service';
import { NewOt } from '../models/newot.model';
import { UploadFile } from '../models/uploadfile.model';
import { Archive } from '../models/archive.model';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.css']
})
export class GenerarQRComponent {
  searchText: string = '';
  folders: Folder[] = [];
  selectedFolder: Folder = new Folder('', 0, '');
  axiosService: AxiosService = new AxiosService();
  limit: number = 10;
  ot: string = '';
  nombre: string = '';
  names: string[] = [];
  files: File[] = [];
  newOt: NewOt = new NewOt('', '', [], []);
  image: any = null;
  loading: boolean = false;
  nameFile: string = '';
  fileu: File = new File([], '');
  archives: Archive[] = [];
  uniqueFile: UploadFile = new UploadFile('', '', new File([], ''));
  modalOpen = false;
  modalOpenQRb = false;
  modalFolderEdit = false;
  searchTerm = '';
  element = false;
  formularios: FormGroup[] = [];
  filter: any;

  rol: string = 'Ing';

  constructor(private fb: FormBuilder, axios: AxiosService) { }

  ngOnInit() {

   this.search();
  }

  listFolders() {
    this.axiosService.request(
      'GET',
      'drive/folders' + this.limit,
      null,
      null,
    ).then((response: any) => {
      this.folders = response.data;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  agregarDatos() {
    const nuevoFormulario = this.fb.group({
      nombreArchivo: [''], // Agrega un campo para el nombre del archivo en el formulario
      archivo: [''] // Agrega un campo para el archivo en el formulario
    });



    this.formularios.push(nuevoFormulario);
    return (this.element = true);
  }

  borrarDatos(index: number) {
    this.formularios.splice(index, 1);
    return (this.element = true);
  }

  captureFile(event: any) {
    this.files.push(event.target.files[0]);
  }

  openModalQR() {
    this.modalOpenQRb = true;
  }

  closeModalQR() {
    this.modalOpenQRb = false;
    this.ngOnInit();
  }

  generarQR(image: any) {
    this.image = image;
    this.closeModalQRVarios();
    this.openModalQR();
    this.cleanInformation();
    this.listFolders();
  }


  cleanInformation() {
    this.newOt = new NewOt('', '', [], []);
    this.files = [];
    this.formularios = [];
    this.element = false;
    this.ot = '';
    this.nombre = '';
  }

  newCharge() {
    this.cleanInformation();
    this.modalOpen = true;
  }

  closeModalQRVarios() {
    this.modalOpen = false;
  }

  openModalImage(event: {image: any}) {
    this.image = event.image;
    this.modalOpenQRb = true;
  }

  saveQr() {
    const base64String = this.image;
    const byteCharacters = atob(base64String.replace(/^data:image\/(png|jpeg);base64,/, ''));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = this.newOt.ot + '.png';
    link.click();

    // Es una buena práctica revocar la URL del objeto después de su uso para liberar memoria
    window.URL.revokeObjectURL(url);
  }

  openModalFolderEdit() {
    this.modalFolderEdit = true;

  }

  closeModalFolderEdit() {
    this.modalFolderEdit = false;
  }

  editFolder( folder: Folder) {
    this.loading = true;
    this.selectedFolder = folder;
    this.axiosService.request(
      'GET',
      'drive/files/' + folder.id,
      null,
      null,
    ).then((response: any) => {
      this.archives = response.data;
      this.loading = false;
      this.openModalFolderEdit();
    }).catch((error: any) => {
      console.log(error);
      this.loading = false;
    });
  }

  captureUniqueFile(event: any) {
    this.uniqueFile.file = event.target.files[0];
  }
  uploadUniqueFile(uniqueFile: UploadFile) {
    this.loading = true;
    this.uniqueFile.file = uniqueFile.file;
    this.uniqueFile.name = uniqueFile.name;
    this.uniqueFile.idFolder = uniqueFile.idFolder;
    if (this.uniqueFile.name === '' || this.uniqueFile.file === null) {
      alert('Por favor, seleccione un archivo');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.uniqueFile.file);
    formData.append('folderId', this.uniqueFile.idFolder);
    formData.append('name', this.uniqueFile.name);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    this.axiosService.request(
      'POST',
      '/drive/upload-file',
      formData,
      config
    ).then((response: any) => {
      this.loading = false;
      this.archives = response.data;
      this.nameFile = '';
      this.fileu = new File([], '');
      this.uniqueFile = new UploadFile('', '', new File([], ''));
      // Lógica después de una respuesta exitosa
    }).catch((error: any) => {
      console.error(error);
      // Lógica para manejar errores
    });
  }

  viewQr( folder: any) {
    this.loading = true;
    const formData = new FormData();
    formData.append('folderId', this.selectedFolder.id);
    this.axiosService.request(
      'GET',
      '/drive/download-qr' + folder.id,
      null,
      null,
    ).then((response: any) => {
      this.loading = false;
      this.image = response.data;
      this.openModalQR();
    }).catch((error: any) => {
      console.log(error);
      this.loading = false;
    }
    );
  }

  deleteFolder(folder: any) {
    this.loading = true;
    this.axiosService.request(
      'DELETE',
      '/drive/delete-folder/' + folder.id,
      null,
      null,
    ).then((response: any) => {
      this.loading = false;
      alert(response.data.data.message);
      this.listFolders();
    }).catch((error: any) => {
      this.loading = false;
      console.log(error);
    }
    );
  }

  viewFile(archive: any) {
    this.axiosService.request(
      'GET',
      '/drive/get-link/' + archive.id,
      null,
      null,
    ).then((response: any) => {
      window.open(response.data, '_blank');
    }).catch((error: any) => {
      console.log(error);
    }
    );
  }

  deleteFile(archive: any) {
    this.loading = true;
    this.axiosService.request(
      'DELETE',
      '/drive/delete-file/' + archive.id,
      null,
      null,
    ).then((response: any) => {
      this.loading = false;
      alert(response.data.data.message);
      this.editFolder( this.selectedFolder);
    }).catch((error: any) => {
      this.loading = false;
      console.log(error);
    }
    );
  }

  //funcion para buscar los elementos de la tabla con el boton buscar
  search(){
    if(this.searchText != ''){
      this.axiosService.request(
        'GET',
        'drive/folder/search/' + this.searchText,
        null,
        null,
      ).then((response: any) => {
        this.folders = response.data;
        if(this.folders.length == 0){
          alert('No se encontraron resultados');
        }
      }).catch((error: any) => {
        console.log(error);
      });

    }else{
      this.listFolders();
    }
  }

}
