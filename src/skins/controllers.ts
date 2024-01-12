import database from "../database";

import { listSkinsQueries, searchCategoriesQueries } from "./queries"

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

        let categoryName: any[] = []

        let weaponName: any[] = []


        const result = await database.query(searchCategoriesQueries)


        categoryName = removeDuplicateRows(result, "category.name", true)

        weaponName = removeDuplicateRows(result, "weapon.name", false)


        categoryName.push(weaponName)


        const flattenArray = categoryName.flat()

        const transformedObject = flattenArray.reduce((acc, category) => {

            const categoryName = category["category.name"]

            const weaponName = category["weapon.name"]


            if (categoryName) {

                if (!acc[categoryName]) {

                    acc[categoryName] = {

                        categoryName: categoryName,

                        weapons: []

                    }

                }

                if (weaponName) {

                    acc[categoryName].weapons.push(weaponName)

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
