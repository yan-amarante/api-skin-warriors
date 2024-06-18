"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategories = exports.listSkins = void 0;
const database_1 = __importDefault(require("../database"));
const queries_1 = require("./queries");
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
        let resultPattern = null; //mudar depois
        if (queryParams.length)
            resultPattern = await database_1.default.query(queries_1.searchPatternInfosQueries, queryParams);
        const result = await database_1.default.query(queries_1.searchCategoriesQueries);
        const categoryName = removeDuplicateRows(result, "category.name", true);
        const weaponName = removeDuplicateRows(result, "weapon.name", false);
        if (resultPattern !== null)
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