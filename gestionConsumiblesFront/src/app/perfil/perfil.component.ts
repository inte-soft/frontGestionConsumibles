import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { AxiosService } from '../axios.service';
import { User } from '../models/user.model';
import { Area } from '../models/area.model';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  appComponent: AppComponent;
  axiosService: AxiosService;
  userImage: any = window.sessionStorage.getItem('avatar');
  changePassWord: boolean = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  chaImage: boolean = false;
  photo: File = new File([], 'newPhoto');

  user: User = new User(0, '', '', '', '', [], new Area(0, ''), '');
  // asignar informacion del usuario para mostrar en el perfil



  constructor(appComponet: AppComponent, axiosService: AxiosService) {
    this.appComponent = appComponet;
    this.axiosService = axiosService;

  }

  ngOnInit(): void {
    this.getUser();
  }

  changeImage() {
    if (this.changePassWord) {
      this.changePassWord = false;
    }
    this.chaImage = !this.chaImage;

  }

  openChangePassword() {
    if (this.chaImage) {
      this.chaImage = false;
    }
    this.changePassWord = !this.changePassWord;
  }

  captureFile(event: any) {
    this.photo = event.target.files[0];
  }

  changePassword(newPassword: string, confirmPassword: any) {
    const id = window.sessionStorage.getItem('id');
    if (confirmPassword === newPassword) {
      this.axiosService.request(
        'PUT',
        '/users/myuser/' + id + '/password',
        { newPassword: newPassword },
        null
      ).then((response: any) => {
        this.changePassWord = false;
        this.newPassword = '';
        this.confirmPassword = '';
        alert(response.data.data.message);
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      alert('Las contraseñas no coinciden');
    }


  }

  changeImageAvatar() {
    const id = window.sessionStorage.getItem('id');
    const formData = new FormData();
    formData.append('file', this.photo);
    formData.append('id', id as string);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    this.axiosService.request(
      'PUT',
      '/users/myuser/photo',
      formData,
      config
    ).then((response: any) => {
      this.chaImage = false;
      this.updateImageWindow();
      setTimeout(() => {
        this.appComponent.avatarInfo();
      }, 3000);
      alert(response.data.data.message);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  updateImageWindow() {
    this.axiosService.request(
      'GET',
      'users/myuser/' + window.sessionStorage.getItem('id') + '/photo',
      {}
    ).then(response => {


      this.userImage = 'data:image/jpeg;base64,' + response.data.data.message;
      window.sessionStorage.setItem('avatar', this.userImage);
      this.appComponent.avatarInfo();

    }
    ).catch((error: any) => {
      console.log(error);
    });
  }
  getUser() {
    this.axiosService.request(
      'GET',
      'users/myuser/' + window.sessionStorage.getItem('id'),
      {}
    ).then(response => {
      this.user = response.data;
    }
    ).catch((error: any) => {
      console.log(error);
    });
  }



}

