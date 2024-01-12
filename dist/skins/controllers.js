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
        let categoryName = [];
        let weaponName = [];
        const result = await database_1.default.query(queries_1.searchCategoriesQueries);
        categoryName = removeDuplicateRows(result, "category.name", true);
        weaponName = removeDuplicateRows(result, "weapon.name", false);
        categoryName.push(weaponName);
        const flattenArray = categoryName.flat();
        const transformedObject = flattenArray.reduce((acc, category) => {
            const categoryName = category["category.name"];
            const weaponName = category["weapon.name"];
            if (categoryName) {
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        categoryName: categoryName,
                        weapons: []
                    };
                }
                if (weaponName) {
                    acc[categoryName].weapons.push(weaponName);
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