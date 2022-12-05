import {
  useListarUsuariosQuery,
  useEliminarUsuarioMutation,
} from "../../app/api/apiSlice";
import { UserCard } from "./UserCard";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FC, useCallback, useEffect } from "react";
import {
  selectCurrentUsers,
  setUsers,
  deleteUser,
} from "@features/users/usersSlice";
import { useNavigate } from "react-router-dom";

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { data: users, isLoading } = useListarUsuariosQuery();
  const [eliminarUsuario] = useEliminarUsuarioMutation();
  const dispatch = useDispatch();
  const usuarios = useSelector(selectCurrentUsers);

  useEffect(() => {
    if (!isLoading && usuarios !== undefined && usuarios.length > 1) return;
    dispatch(setUsers({ users }));
  }, [isLoading]);

  const handleEliminarUsuario = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteUser({ id }));
        await eliminarUsuario(id);
      } catch (error) {}
    },
    [isLoading]
  );

  return isLoading ? (
    <p>loading... </p>
  ) : (
    <div className={styles.dashboard}>
      <p
        onClick={() => navigate("/crear-usuario")}
        className={styles["text__button"]}
      >
        CREAR USUARIO +
      </p>
      {usuarios?.map((_) => (
        <UserCard
          onDelete={() => handleEliminarUsuario(_.id)}
          nombre={_.nombre}
          apellido={_.apellido}
          empresa={_.empresa}
          email={_.email}
          id={_.id}
          key={_.id}
        />
      ))}
    </div>
  );
};
