"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategories = exports.listSkins = void 0;
const database_1 = __importStar(require("../database"));
const queries_1 = require("./queries");
(0, database_1.connectDatabase)();
async function listSkins(req, res) {
    try {
        const result = await database_1.default.query(queries_1.listSkinsQueries);
        res.status(200).send({ skins: result.rows });
    }
    catch (error) {
        res.status(500).send({ erro: error });
    }
}
exports.listSkins = listSkins;
function removeDuplicateRows(result, keyName, deleteKey) {
    const array = [];
    result.rows.forEach((item) => {
        const exists = array.some((object) => object[keyName] === item[keyName]);
        if (!exists) {
            if (deleteKey)
                delete item["weapon.name"];
            array.push(item);
        }
    });
    return array;
}
async function searchCategories(req, res) {
    try {
        const queryParams = [req.query.patterns];
        let resultPattern;
        if (queryParams.length)
            resultPattern = await database_1.default.query(queries_1.searchPatternInfosQueries, queryParams);
        const result = await database_1.default.query(queries_1.searchCategoriesQueries);
        const categoryName = removeDuplicateRows(result, "category.name", true);
        const weaponName = removeDuplicateRows(result, "weapon.name", false);
        categoryName.push(resultPattern.rows);
        categoryName.push(weaponName);
        const flattenArray = categoryName.flat();
        const transformedObject = flattenArray.reduce((acc, category) => {
            const categoryName = category["category.name"];
            const weaponName = category["weapon.name"];
            const patternName = category["pattern.name"];
            const wears = category["wears"];
            const image = category["image"];
            if (categoryName) {
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        categoryName: categoryName,
                        weapons: {}
                    };
                }
                if (weaponName) {
                    if (categoryName === req.query.patterns) {
                        if (patternName && wears && image !== undefined) {
                            if (!acc[categoryName].weapons[weaponName]) {
                                acc[categoryName].weapons[weaponName] = {};
                            }
                            acc[categoryName].weapons[weaponName][patternName] = {
                                patternName: patternName,
                                wears: wears,
                                image: image,
                            };
                        }
                    }
                    else {
                        acc[categoryName].weapons[weaponName] = {};
                    }
                }
            }
            return acc;
        }, {});
        res.status(200).send(transformedObject);
    }
    catch (error) {
        res.status(500).send({ erro: error });
    }
}
exports.searchCategories = searchCategories;
//# sourceMappingURL=controllers.js.map