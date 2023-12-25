// Codigo para crear la conexion con el servidor
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  //este es el constructor de la clase
  constructor() {
    //axios.defaults.baseURL = "https://backend.solendev.online/";
    axios.defaults.baseURL = "http://localhost:8080/";
    //esta es la configuracion de la peticion del servidor
    axios.defaults.headers.post["Content-Type"] = "application/json"; 
  }
// este metodo es para obtener el token de autenticacion
  getAuthToken(): string | null {
    return window.sessionStorage.getItem("AUTHORIZATION");
  }
// este metodo es para guardar el token de autenticacion
  setAuthToken(token: string): void {
    if (token !== null) {
      window.sessionStorage.setItem("AUTHORIZATION", token);
    }else {
      window.sessionStorage.removeItem("AUTHORIZATION");
    }
  }
  // este metodo es para hacer las peticiones al servidor
  request(method: string, url: string, data: any): Promise<any> {
// este es el encabezado de la peticion
    let headers = {};
// este if es para saber si el token de autenticacion es diferente de null
    if (this.getAuthToken() !== null) {
      headers={"AUTHORIZATION" : "Bearer " + this.getAuthToken()};
    }
// este return es para hacer la peticion al servidor
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
}
