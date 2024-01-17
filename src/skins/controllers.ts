import database from "../database";

import { listSkinsQueries, searchCategoriesQueries, searchPatternInfosQueries } from "./queries"

import { Request, Response } from "express";


async function listSkins(req: Request, res: Response) {

    try {

        const result = await database.query(listSkinsQueries)

        res.status(200).send({ skins: result.rows })

    }

    catch (error) {

        res.status(500).send({ erro: error })

    }

}

function removeDuplicateRows(result: any, keyName: any, deleteKey: boolean) {

    const array: any = []

    result.rows.forEach((item: any) => {

        const exists = array.some((object: any) => object[keyName] === item[keyName])


        if (!exists) {

            if (deleteKey) delete item["weapon.name"]

            array.push(item)

        }

    })

    return array

}

async function searchCategories(req: Request, res: Response) {

    try {

        const queryParams = [req.query.patterns]

        let resultPattern: any


        if (queryParams.length) resultPattern = await database.query(searchPatternInfosQueries, queryParams)

        const result = await database.query(searchCategoriesQueries)


        const categoryName: any[] = removeDuplicateRows(result, "category.name", true)

        const weaponName: any[] = removeDuplicateRows(result, "weapon.name", false)


        categoryName.push(resultPattern.rows)

        categoryName.push(weaponName)


        const flattenArray = categoryName.flat()


        const transformedObject = flattenArray.reduce((acc, category) => {

            const categoryName = category["category.name"]

            const weaponName = category["weapon.name"]

            const patternName = category["pattern.name"]

            const wears = category["wears"]

            const image = category["image"]


            if (categoryName) {

                if (!acc[categoryName]) {

                    acc[categoryName] = {

                        categoryName: categoryName,

                        weapons: {}

                    }

                }

                if (weaponName) {

                    if (categoryName === req.query.patterns) {

                        if (patternName && wears && image !== undefined) {

                            if (!acc[categoryName].weapons[weaponName]) {

                                acc[categoryName].weapons[weaponName] = {}

                            }

                            acc[categoryName].weapons[weaponName][patternName] = {

                                patternName: patternName,

                                wears: wears,

                                image: image,

                            }

                        }

                    } else {

                        acc[categoryName].weapons[weaponName] = {}

                    }

                }

            }

            return acc

        }, {})


        res.status(200).send(transformedObject)

    }

    catch (error) {

        res.status(500).send({ erro: error })

    }

}


export { listSkins, searchCategories }