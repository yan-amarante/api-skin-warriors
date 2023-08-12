import pg, {Client} from "pg"
import { URL } from "./dbConfig.js";

const database: Client = new pg.Client(URL);

database.connect((erro:any) => {
    if(erro){
        return console.log("Não foi possivel conectar com o ElephantSQL", erro);
    }else {
        return console.log("Conectado ao ElephantSQL!");
    }
});

export default database