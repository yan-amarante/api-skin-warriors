"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/buscar-grid-skins', controllers_1.buscarGridSkins);
router.get('/consultar-tamanho-tabela', controllers_1.consultarTamanhoTabela);
//# sourceMappingURL=routes.js.map