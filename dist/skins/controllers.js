"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarTamanhoTabela = exports.buscarGridSkins = void 0;
const database_1 = __importDefault(require("../database"));
const queries_1 = require("./queries");
const buscarGridSkins = (req, res) => {
    database_1.default.query(queries_1.buscarGridSkinsQueries).then((resultado) => {
        res.status(200).send({ skins: resultado.rows });
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
};
exports.buscarGridSkins = buscarGridSkins;
const consultarTamanhoTabela = (req, res) => {
    database_1.default.query(queries_1.consultarTamanhoTabelaQueries).then((resultado) => {
        res.status(200).send({ tamanho: resultado.rows });
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
};
exports.consultarTamanhoTabela = consultarTamanhoTabela;
//# sourceMappingURL=controllers.js.map