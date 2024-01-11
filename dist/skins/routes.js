"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/list-skins', controllers_1.listSkins);
router.get('/search-categories', controllers_1.searchCategories);
//# sourceMappingURL=routes.js.map