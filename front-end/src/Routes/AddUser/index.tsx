import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { useCrearUsuarioMutation } from "@app/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { setUsers } from "@features/users/usersSlice";
import { Usuario } from "@types";

export const AddUser = () => {
  const navigate = useNavigate();
  const [crearUsuario, { isLoading }] = useCrearUsuarioMutation();
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const response = await crearUsuario({
          nombre,
          apellido,
          empresa,
          email,
        });
        dispatch(setUsers({ users: response.data as Usuario[] }));
        setApellido("");
        setEmail("");
        setEmpresa("");
        setNombre("");
        navigate("/dashboard");
      } catch (error) {
        throw error;
      }
    },
    [nombre, apellido, empresa, email]
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles["crear__usuario"]}>
        <p>Crear usuario</p>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellido"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          placeholder="Empresa"
        />
        <button>Completar</button>
      </form>
    </div>
  );
};
