"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = new pg_1.default.Client(process.env.DATABASE_URL);
database.connect();
console.log("Conectado ao ElephantSQL!");
const disconnectFromDatabase = async () => {
    try {
        await database.end();
        console.log('Disconnected from the database!');
    }
    catch (error) {
        console.error('Failed to disconnect from the database:', error);
    }
};
exports.disconnectFromDatabase = disconnectFromDatabase;
exports.default = database;
//# sourceMappingURL=database.js.map