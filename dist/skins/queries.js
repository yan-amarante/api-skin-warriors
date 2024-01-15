"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPatternInfosQueries = exports.searchCategoriesQueries = exports.listSkinsQueries = void 0;
const listSkinsQueries = 'SELECT * FROM skins';
exports.listSkinsQueries = listSkinsQueries;
const searchCategoriesQueries = 'SELECT "category.name", "weapon.name" FROM skins';
exports.searchCategoriesQueries = searchCategoriesQueries;
const searchPatternInfosQueries = 'SELECT "weapon.name", "category.name", "pattern.name", "wears", "min_float", "max_float" FROM skins WHERE "category.name"=$1';
exports.searchPatternInfosQueries = searchPatternInfosQueries;
//# sourceMappingURL=queries.js.map