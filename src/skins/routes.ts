import  { Router }  from "express";
import { buscarGridSkins, consultarTamanhoTabela } from "./controllers";

const router:Router = Router();

router.get('/buscar-grid-skins', buscarGridSkins);
router.get('/consultar-tamanho-tabela', consultarTamanhoTabela);

export  {router}