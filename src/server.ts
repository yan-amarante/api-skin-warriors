import  Express, {Application}  from "express"

import {router as salesRoutes} from "./sales/routes";

import {router as skinsRoutes} from "./skins/routes";

import bodyParser from "body-parser";

import cors from "cors"


const app: Application = Express();

const port: number = 3000;


app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json());

app.use('/sales', salesRoutes);

app.use('/skins', skinsRoutes);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))