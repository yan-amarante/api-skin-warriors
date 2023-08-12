import database from "../database.js";
import { buscarSkinsQueries } from "./queries.js";
const buscarSkins = (req, res) => {
    database.query(buscarSkinsQueries).then((resultado) => {
        res.status(200).send({ tarefas: resultado.rows });
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
};
export { buscarSkins };
//# sourceMappingURL=controllers.js.map