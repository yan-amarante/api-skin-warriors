import  { Router }  from "express";

import { listSales, createSale } from "./controllers";


const router:Router = Router();


router.get('/list-sales', listSales);

router.post("/create-sale", createSale)


export  {router}