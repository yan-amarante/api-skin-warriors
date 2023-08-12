import { Router } from "express";
import { buscarSkins } from "./controllers.js";
const router = Router();
router.get('/buscar-skins', buscarSkins);
export { router };
//# sourceMappingURL=routes.js.map