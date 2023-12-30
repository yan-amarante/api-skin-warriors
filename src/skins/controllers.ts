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

async function searchCategories(req: Request, res: Response) {

    try {

        const transormedObject: any[] = []

        const result = await database.query(searchCategoriesQueries)

        result.rows.forEach((item: any) => {

            const exists = transormedObject.some((object) => object["category.id"] === item["category.id"]);

            if (!exists) {
                transormedObject.push(item);
            }
        })

        res.status(200).send(transormedObject)

    }

    catch (error) {

        res.status(500).send({ erro: error })

    }

}


export { listSkins, searchCategories }
