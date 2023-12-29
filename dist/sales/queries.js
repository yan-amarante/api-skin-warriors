"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleQueries = exports.listSalesQueries = void 0;
const listSalesQueries = 'SELECT * FROM sales';
exports.listSalesQueries = listSalesQueries;
const createSaleQueries = 'INSERT INTO sales (image, name, pattern, wear, float, price) VALUES ($1, $2, $3, $4, $5, $6);';
exports.createSaleQueries = createSaleQueries;
//# sourceMappingURL=queries.js.map