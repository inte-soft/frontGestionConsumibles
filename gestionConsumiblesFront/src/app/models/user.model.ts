import { Area } from "./ara.model";
import { Role } from "./role.model";

// clase con modelo de usuario
export class User {
  id: number;
  name: string;
  lastName: string;
  password: string;
  rol: Role[];
  area: Area;
  constructor(id: number, name: string, lastName: string, password: string, rol: Role[], area: Area) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
    this.area = area;
  }
}