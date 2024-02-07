"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/list-sales', controllers_1.listSales);
router.post("/create-sale", controllers_1.createSale);
router.delete("/close-sale/:id", controllers_1.closeSale);
//# sourceMappingURL=routes.js.map