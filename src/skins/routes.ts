import { Router } from "express";

import { listSkins, searchCategories } from "./controllers";


const router: Router = Router();


router.get('/list-skins', listSkins)

router.get('/search-categories', searchCategories)


export { router }