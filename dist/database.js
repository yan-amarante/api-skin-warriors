import pg from "pg";
import { URL } from "./dbConfig.js";
const database = new pg.Client(URL);
database.connect((erro) => {
    if (erro) {
        return console.log("Não foi possivel conectar com o ElephantSQL", erro);
    }
    else {
        return console.log("Conectado ao ElephantSQL!");
    }
});
export default database;
//# sourceMappingURL=database.js.map