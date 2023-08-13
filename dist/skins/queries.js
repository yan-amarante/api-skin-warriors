"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarTamanhoTabelaQueries = exports.buscarGridSkinsQueries = void 0;
const buscarGridSkinsQueries = 'SELECT * FROM skins ORDER BY random() LIMIT 6';
exports.buscarGridSkinsQueries = buscarGridSkinsQueries;
const consultarTamanhoTabelaQueries = 'SELECT count(*) FROM skins';
exports.consultarTamanhoTabelaQueries = consultarTamanhoTabelaQueries;
//# sourceMappingURL=queries.js.map