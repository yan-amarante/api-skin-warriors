import  { Router }  from "express";

import { listSales, createSale, closeSale } from "./controllers";


const router:Router = Router();


router.get('/list-sales', listSales);

router.post("/create-sale", createSale)

router.delete("/close-sale/:id", closeSale)


export  {router}