"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_js_1 = require("./controllers.js");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/buscar-skins', controllers_js_1.buscarSkins);
