import { Request, Response } from "express";
import { accessTokenSecret } from "../config";
import jwt from "jsonwebtoken";

const users = [
  {
    id: "0001",
    email: "juan@gmail.com",
    password: "Password1!",
    nombre: "Juan",
    apellido: "Perez",
    empresa: "Vectorial",
  },
  {
    id: "0002",
    email: "andres@gmail.com",
    password: "Password1!",
    nombre: "Andres",
    apellido: "Perez",
    empresa: "Vectorial",
  },
  {
    id: "0003",
    email: "pedro@gmail.com",
    password: "Password1!",
    nombre: "Pedro",
    apellido: "Perez",
    empresa: "Vectorial",
  },
];

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = users.filter((_) => _.email === email);

    if (user.length === 0)
      return res.status(401).json({ message: "Usuario o contraseña invalida" });

    //Compare passwords

    if (await validatePassword(password, user[0].password)) {
      const accessToken = createJWT({
        email: user[0].email,
      });
      res.json({
        id: user[0].id,
        accessToken,
        email,
        nombre: user[0].nombre,
        apellido: user[0].apellido,
        empresa: user[0].empresa,
      });
      return;
    }

    return res.status(401).json({ message: "Usuario o contraseña invalida" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const validatePassword = (password: string, hash: string) => password === hash;

const createJWT = (user: any, expirationTime?: string) =>
  jwt.sign(user, accessTokenSecret!, {
    expiresIn: expirationTime ? expirationTime : "7d",
  });
