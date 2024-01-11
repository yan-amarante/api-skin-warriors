"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategories = exports.listSkins = void 0;
const database_1 = __importDefault(require("../database"));
const queries_1 = require("./queries");
async function listSkins(req, res) {
    try {
        const result = await database_1.default.query(queries_1.listSkinsQueries);
        res.status(200).send({ skins: result.rows });
    }
    catch (error) {
        res.status(500).send({ erro: error });
    }
}
exports.listSkins = listSkins;
async function searchCategories(req, res) {
    try {
        const transormedObject = [];
        const result = await database_1.default.query(queries_1.searchCategoriesQueries);
        result.rows.forEach((item) => {
            const exists = transormedObject.some((object) => object["category.id"] === item["category.id"]);
            if (!exists) {
                transormedObject.push(item);
            }
        });
        res.status(200).send(transormedObject);
    }
    catch (error) {
        res.status(500).send({ erro: error });
    }
}
exports.searchCategories = searchCategories;
//# sourceMappingURL=controllers.js.map