import { Router } from "express";

import { listSkins } from "./controllers";


const router: Router = Router();


router.get('/list-skins', listSkins);


export { router }