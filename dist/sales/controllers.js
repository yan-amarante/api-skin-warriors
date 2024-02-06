"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSale = exports.listSales = void 0;
const database_1 = __importDefault(require("../database"));
const queries_1 = require("./queries");
function transformToObject(array) {
    const object = array.reduce((acc, item) => {
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
    return object;
}
async function listAllSales(req, res) {
    try {
        let result = await database_1.default.query(queries_1.listSalesQueries);
        const transformedObject = transformToObject(result.rows);
        res.status(200).send(transformedObject);
    }
    catch (erro) {
        res.status(500).send({ erro: erro });
    }
}
async function countNumberOfPages(query, value = null) {
    let resultCount;
    if (value === null)
        resultCount = await database_1.default.query(query);
    else
        resultCount = await database_1.default.query(query, value);
    const totalItems = resultCount.rows[0].count;
    const limit = 14;
    const numberOfPages = Math.ceil(totalItems / limit);
    if (numberOfPages === 0)
        return 1;
    else
        return numberOfPages;
}
async function listSales(req, res) {
    const pageParams = req.query.page;
    const filterParams = [req.query.name, req.query.wear];
    const nameParams = [req.query.name];
    const wearParams = [req.query.wear];
    if (pageParams === undefined) {
        listAllSales(req, res);
    }
    else if (pageParams !== undefined) {
        const limit = 14;
        const values = [(pageParams - 1) * limit];
        let rowsNumber;
        let result;
        if (nameParams[0] && wearParams[0] !== undefined)
            rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales WHERE name=$1 AND wear=$2", filterParams);
        else if (nameParams[0] !== undefined && wearParams[0] === undefined)
            rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales WHERE name=$1", nameParams);
        else if (nameParams[0] === undefined && wearParams[0] !== undefined)
            rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales WHERE wear=$1", wearParams);
        else
            rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales");
        if (nameParams[0] && wearParams[0] !== undefined) {
            values.push(nameParams[0], wearParams[0]);
            result = await database_1.default.query('SELECT * FROM sales WHERE name=$2 AND wear=$3 OFFSET $1 LIMIT 14', values);
        }
        else if (nameParams[0] !== undefined && wearParams[0] === undefined) {
            values.push(nameParams[0]);
            result = await database_1.default.query('SELECT * FROM sales WHERE name=$2 OFFSET $1 LIMIT 14', values);
        }
        else if (nameParams[0] === undefined && wearParams[0] !== undefined) {
            values.push(wearParams[0]);
            result = await database_1.default.query('SELECT * FROM sales WHERE wear=$2 OFFSET $1 LIMIT 14', values);
        }
        else {
            result = await database_1.default.query('SELECT * FROM sales OFFSET $1 LIMIT 14', values);
        }
        const transformedObject = transformToObject(result.rows);
        transformedObject.numberOfPages = rowsNumber;
        res.status(200).send(transformedObject);
    }
}
exports.listSales = listSales;
//rowsNumber by filter // search by query params
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