import pg, { Client } from "pg"

import dotenv from "dotenv";


dotenv.config();


const database: Client = new pg.Client(process.env.DATABASE_URL);


database.connect((erro: any) => {

    if (erro) {

        return console.log("Não foi possivel conectar com o ElephantSQL", erro);

    } else {

        return console.log("Conectado ao ElephantSQL!");

    }

});


export default database