"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategoriesQueries = exports.listSkinsQueries = void 0;
const listSkinsQueries = 'SELECT * FROM skins';
exports.listSkinsQueries = listSkinsQueries;
const searchCategoriesQueries = 'SELECT "category.name", "weapon.name" FROM skins';
exports.searchCategoriesQueries = searchCategoriesQueries;
//# sourceMappingURL=queries.js.map