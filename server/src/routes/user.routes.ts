import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  elimitarUsuario,
} from "../controllers/user.controllers";
import { authenticateToken } from "../middleware/requiredAuth";
const router = Router();

router.post("/users", crearUsuario);
router.get("/admin_list_active_users", listarUsuarios);
router.delete("/admin_delete_user", elimitarUsuario);

export default router;
