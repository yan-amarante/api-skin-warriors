"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarSkins = void 0;
const database_js_1 = __importDefault(require("../database.js"));
const queries_js_1 = require("./queries.js");
const buscarSkins = (req, res) => {
    database_js_1.default.query(queries_js_1.buscarSkinsQueries).then((resultado) => {
        res.status(200).send({ tarefas: resultado.rows });
    }, (erro) => {
        res.status(500).send({ erro: erro });
    });
};
exports.buscarSkins = buscarSkins;
