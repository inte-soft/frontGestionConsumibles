import { Role } from "./role.model";

// clase con modelo de usuario
export class User {
  id: number;
  name: string;
  lastName: string;
  rol: Role[];
  constructor(id: number, name: string, lastName: string, roles: Role[]) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.rol = roles;
  }
}