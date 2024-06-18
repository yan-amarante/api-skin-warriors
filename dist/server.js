"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./sales/routes");
const routes_2 = require("./skins/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
let port;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}
else
    port = 3000;
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(body_parser_1.default.json());
app.use('/sales', routes_1.router);
app.use('/skins', routes_2.router);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
//# sourceMappingURL=server.js.map