"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSale = exports.listSales = void 0;
const database_1 = __importDefault(require("../database"));
const queries_1 = require("./queries");
async function listSales(req, res) {
    database_1.default.query(queries_1.listSalesQueries).then((resultado) => {
        const transformedObject = resultado.rows.reduce((acc, item) => {
            acc[item.id] = {
                id: item.id,
                image: item.image,
                name: item.name,
                pattern: item.pattern,
                wear: item.wear,
                price: item.price,
                category: item.category
            };
            return acc;
        }, {});
        res.status(200).send(transformedObject);
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
}
exports.listSales = listSales;
async function createSale(req, res) {
    const values = [req.body.image, req.body.name, req.body.pattern, req.body.wear, req.body.price, req.body.category];
    database_1.default.query(queries_1.createSaleQueries, values).then((resultado) => {
        res.status(200).send({ message: "sucesso" });
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
}
exports.createSale = createSale;
//# sourceMappingURL=controllers.js.map