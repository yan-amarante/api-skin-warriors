"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarSkins = void 0;
const database_1 = __importDefault(require("../database"));
const queries_1 = require("./queries");
const buscarSkins = (req, res) => {
    database_1.default.query(queries_1.buscarSkinsQueries).then((resultado) => {
        res.status(200).send({ skins: resultado.rows });
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
};
exports.buscarSkins = buscarSkins;
//# sourceMappingURL=controllers.js.map