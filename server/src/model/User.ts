import { v4 as uuidv4 } from "uuid";

export class Usuario {
  public nombre: string;
  public apellido: string;
  public empresa: string;
  public email: string;
  public id: string;
  constructor(
    nombre: string,
    appellido: string,
    empresa: string,
    email: string
  ) {
    this.nombre = nombre;
    this.apellido = appellido;
    this.empresa = empresa;
    this.email = email;
    this.id = uuidv4();
  }
}
