import { Area } from "./area.model";
import { Role } from "./role.model";

// clase con modelo de usuario
export class User {
  id: number;
  userName: string;
  name: string;
  lastName: string;
  password: string;
  rol: Role[];
  area: Area;
  email: string;
  constructor(id: number, userName: string, name: string, lastName: string, password: string, rol: Role[], area: Area , email: string) {
    this.id = id;
    this.userName = userName;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
    this.area = area;
    this.email = email;
  }
}