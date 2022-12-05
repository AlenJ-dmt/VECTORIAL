import { FC } from "react";
import styles from "./UserCard.module.scss";
import { AiOutlineDelete } from "react-icons/ai";

interface IUserCardProps {
  nombre: string;
  apellido: string;
  email: string;
  empresa: string;
  id: string;
  onDelete: (_: string) => void;
}
export const UserCard: FC<IUserCardProps> = ({
  nombre,
  apellido,
  email,
  empresa,
  id,
  onDelete,
}) => {
  return (
    <div className={styles["user__card"]}>
      <div className={styles["card__header"]}>
        <p>Usuario</p>
        <div onClick={() => onDelete()}>
          <AiOutlineDelete />
        </div>
      </div>
      <div>
        <span>Nombre: </span>
        <span>{nombre}</span>
      </div>
      <div>
        <span>Apellido: </span>
        <span>{apellido}</span>
      </div>
      <div>
        <span>Empresa: </span>
        <span>{empresa}</span>
      </div>
      <div>
        <span>Email: </span>
        <span>{email}</span>
      </div>
    </div>
  );
};
