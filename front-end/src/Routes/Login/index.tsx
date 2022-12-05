import { useLoginMutation } from "../../app/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { TextField } from "@mui/material";
import styles from "./index.module.scss";

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("andres@gmail.com");
  const [password, setPassword] = useState("Password1!");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };
  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <p>Login</p>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Iniciar sesion</button>
    </form>
  );
};
