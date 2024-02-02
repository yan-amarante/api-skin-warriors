"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleQueries = exports.listSalesCount = exports.listSalesPageQueries = exports.listSalesQueries = void 0;
const listSalesQueries = 'SELECT * FROM sales';
exports.listSalesQueries = listSalesQueries;
const listSalesPageQueries = 'SELECT * FROM sales OFFSET $1 LIMIT 14';
exports.listSalesPageQueries = listSalesPageQueries;
const listSalesCount = 'SELECT count(*) FROM sales';
exports.listSalesCount = listSalesCount;
const createSaleQueries = 'INSERT INTO sales (image, name, pattern, wear, price, category) VALUES ($1, $2, $3, $4, $5, $6);';
exports.createSaleQueries = createSaleQueries;
//# sourceMappingURL=queries.js.map