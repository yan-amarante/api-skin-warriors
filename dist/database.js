"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = new pg_1.default.Client(process.env.DATABASE_URL);
database.connect((erro) => {
    if (erro) {
        return console.log("Não foi possivel conectar com o ElephantSQL", erro);
    }
    else {
        return console.log("Conectado ao ElephantSQL!");
    }
});
exports.default = database;
//# sourceMappingURL=database.js.map