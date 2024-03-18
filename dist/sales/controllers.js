"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSale = exports.createSale = exports.listSales = void 0;
const database_1 = __importStar(require("../database"));
const queries_1 = require("./queries");
(0, database_1.connectDatabase)();
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
    try {
        const pageParams = req.query.page;
        const nameParam = req.query.name;
        const wearParam = req.query.wear;
        let filterQuery = 'SELECT count(*) FROM sales';
        let values = [];
        let resultQuery = 'SELECT * FROM sales';
        let filterParams = [];
        if (nameParam !== undefined && wearParam !== undefined) {
            filterQuery = 'SELECT count(*) FROM sales WHERE name=$1 AND wear=$2';
            resultQuery = 'SELECT * FROM sales WHERE name=$2 AND wear=$3';
            filterParams = [nameParam, wearParam];
            values = [(pageParams - 1) * 14, nameParam, wearParam];
        }
        else if (nameParam !== undefined) {
            filterQuery = 'SELECT count(*) FROM sales WHERE name=$1';
            resultQuery = 'SELECT * FROM sales WHERE name=$2';
            filterParams = [nameParam];
            values = [(pageParams - 1) * 14, nameParam];
        }
        else if (wearParam !== undefined) {
            filterQuery = 'SELECT count(*) FROM sales WHERE wear=$1';
            resultQuery = 'SELECT * FROM sales WHERE wear=$2';
            filterParams = [wearParam];
            values = [(pageParams - 1) * 14, wearParam];
        }
        else {
            filterQuery = 'SELECT count(*) FROM sales';
            values = [(pageParams - 1) * 14];
        }
        const rowsNumber = await countNumberOfPages(filterQuery, filterParams);
        const result = await database_1.default.query(resultQuery + ' OFFSET $1 LIMIT 14', values);
        const transformedObject = transformToObject(result.rows);
        transformedObject.numberOfPages = rowsNumber;
        res.status(200).send(transformedObject);
    }
    catch (error) {
        res.status(500).send({ erro: error });
    }
}
exports.listSales = listSales;
async function createSale(req, res) {
    try {
        const values = [req.body.image, req.body.name, req.body.pattern, req.body.wear, req.body.price, req.body.category];
        const result = await database_1.default.query(queries_1.createSaleQueries, values);
        res.status(200).send({ message: "sucesso" });
    }
    catch (error) {
        res.status(500).send({ erro: error });
    }
}
exports.createSale = createSale;
async function closeSale(req, res) {
    try {
        const values = [req.params.id];
        let result = await database_1.default.query("DELETE FROM sales WHERE id=$1", values);
        res.status(200).send({ message: "sucesso" });
    }
    catch (erro) {
        res.status(500).send({ erro: erro });
    }
}
exports.closeSale = closeSale;
//# sourceMappingURL=controllers.js.map