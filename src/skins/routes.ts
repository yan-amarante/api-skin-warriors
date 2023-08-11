import  { Router }  from "express";
import { buscarSkins } from "./controllers";

const router:Router = Router();

router.get('/buscar-skins', buscarSkins);

export  {router}