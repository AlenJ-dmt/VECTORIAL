import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../model/User";

let usuarios: Usuario[] = [
  new Usuario("Juan", "Cortes", "Vectorial", "juan@gmail.com"),
  new Usuario("Pedro", "Cortes", "Vectorial", "pedro@gmail.com"),
  new Usuario("Oscar", "Cortes", "Vectorial", "oscar@gmail.com"),
];

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, empresa } = req.body;

    const existeUsuario = usuarios.filter((_) => _.email === email).length > 0;

    if (existeUsuario) {
      return res.status(409).json({ message: "Este email esta en uso" });
    }

    const usuario = new Usuario(nombre, apellido, empresa, email);

    usuarios.push(usuario);

    return res.json(usuarios)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    return res.json(usuarios);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const elimitarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const existeUsuario = usuarios.filter((_) => _.id === id).length > 0;

    if (existeUsuario) {
      usuarios = usuarios.filter((_) => _.id !== id);
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 12);
