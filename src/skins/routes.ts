import  { Router }  from "express";
import { buscarSkins } from "./controllers.js";

const router:Router = Router();

router.get('/buscar-skins', buscarSkins);

export  {router}